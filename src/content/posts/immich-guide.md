---
title: How to setup your own Cloud Photo Storage with Immich and Docker
description: A continuation from my Jellyfin Media Server guide. Showing how you can also turn your old Windows PC into a private cloud storage for your photos and videos.
alt: Guide to turn an old Windows PC into a cloud photo storage with Immich
tags: ["networking", "immich", "home server", "docker"]
layout: "@/templates/BasePost.astro"
pubDate: Tuesday, 20 October 2026 06:30:00 GMT
# updateDate: 2026-04-02
imgSrc: "/imgs/2026/oct/immich.jpg"
imgAlt: "Immich app on phone and desktop"
authors: [Dhanushka Jayagoda]
---

This article assumes you've read my guide on setting up a Jellyfin Media Server. Go read that first before reading this.

In this article I aim to provide a continuation from my definitive beginner-friendly guide to turn an old Windows PC/laptop into a Jellyfin Media Server. We will be setting up Immich so you can use your Windows 10 PC as a private cloud storage for your whole family to store photos and videos that you can acess at home or abroad, instead of having to pay monthly payments to Google or Apple. 

## The Big Picture

You want this flow:

```
Phone / PC / TV (at home or outside)
        ↓
https://immich.<YOUR_SERVER'S_DUCKDNS_DOMAIN>.duckdns.org:8443
        ↓
Caddy (HTTPS reverse proxy)
        ↓
Immich (<YOUR_SERVER'S_LOCAL_IP>:2283)
```

## Requirements:

* (Mandatory) HDD for storing your photos/videos (preferably a quiet NAS HDD built for 24/7 usage, like a **WD Red Plus 4TB HDD**, ~£140 brand new)
* (Highly recommended) SSD to store Immich files (otherwise put it in the HDD, but Immich will be slow). Highly recommended to get a SSD with enough storage space and **Power Loss Protection** like a **Crucial MX500 500GB**, ~£40 used good quality)
* (Mandatory) Decent CPU for Immich (especially needed for nice optional ML features).
* (Mandatory) At least 8GB RAM, preferably 16GB. DDR3 is fine.

## 1. Enable Virtualization 

Before installing Docker, you need to ensure that **Virtualization** is enabled. Open **Task Manager**, go to **Performance > CPU**, and check that it says **"Virtualization: Enabled"**. If it says **Disabled**, then you must perform the following steps to enable it: 

1. Restart the computer.
2. As soon as the screen goes black and starts booting back up, tap the **F2** key or **Delete** key repeatedly until the BIOS screen appears. _(You may have to press F10 or F12 instead depending on your motherboard brand)._
3. Once in the BIOS menu, look for a tab or section named **Advanced**, **CPU Configuration**, or **Processor**.
4. Find the setting named **Intel Virtualization Technology** (sometimes abbreviated as **Intel VT-x** or **VT-d**) and change it from _Disabled_ to **Enabled**.
5. Save your changes and exit (usually by pressing the **F10** key).

Your computer will boot back into Windows normally.

Once you are back in Windows, open **Task Manager** again to verify that it now says **"Virtualization: Enabled"**. 

## 2. Enable Windows Hypervisor Features 

Now that you have enabled Virtualization, you need to ensure **Windows has turned on its software virtualization layers** (the hypervisor platforms). Since Windows doesn't have them active at boot, Docker can't seem them.

1. Press the **Windows Key**, type **Turn Windows features on or off**, and click on it when it appears.
2. A small window with a list of checkboxes will pop up. Scroll through the list and make sure you put a checkmark next to these three specific features:
   * **Virtual Machine Platform**
   * **Windows Hypervisor Platform**
   * **Windows Subsystem for Linux**
3. Click **OK**. Windows will take a moment to pull up the required files and install them.
4. When it finishes, it will prompt you with a button to **Restart now**. Go ahead and restart the PC.

## 3. Install Docker Desktop for Windows x86_64 (AMD64)

Install Docker Desktop for Windows AMD64: https://www.docker.com/products/docker-desktop/

During the installation steps, ensure it includes **WSL 2 backend**.

Open Docker Desktop once installed. If you see an error message saying "WSL needs updating. Your version of Windows Subsystem for Linux (WSL) is too old.", open **Command Prompt** and run the following command:

```cmd
wsl --update
```

Windows will download and install the latest kernel package for WSL. It should only take about a minute. 

Once it says the update is complete, go ahead and open **Docker Desktop** again. It should now successfully load the main dashboard with a green status indicator in the bottom-left corner. (If you see a **"Resume** triangle button", it means the background engine was paused or suspended, just click the **"Resume"** button and you should see the status indicator turn **Green** and say **"Running"**).

## 4. Setup Immich folders on the SSD and HDD 

Now that Docker Desktop is installed and running, we can setup Immich.

1. **On your HDD (D: Drive)**, create a new folder named **ImmichData** (this will be the home for all new uploads), and **Pictures** (this will be the home of any photos you want to export manually, like from a DSLR Camera).
2. Open the **D:\ImmichData** folder and create a subfolder inside named **Originals**.
3. **On your SSD (C: Drive)**, create a new folder named **immich-app**.
4. Inside the **C:\immich-app** folder, create a **.env** file and paste in this text:

   ```env 
   # Path to your mass storage hard drive
   UPLOAD_LOCATION=D:/ImmichData/Originals

   # Postgres configuration (Change this to a strong password of your choice)
   DB_PASSWORD=<ENTER-YOUR-PASSWORD-HERE>

   DB_USERNAME=postgres
   DB_DATABASE_NAME=immich

   # Keep the DB files stored on the SSD right here in this folder
   DB_DATA_LOCATION=./immich-db
   ```

   make sure to add your own password to **DB_PASSWORD** with no < or >.

5. Also inside **C:\immich-app**, create a **docker-compose.yml** file and paste the following text inside:

   ```yml
   name: immich

   services:
     immich-server:
       container_name: immich_server
       # image: ghcr.io/immich-app/immich-server:release
       image: ghcr.io/immich-app/immich-server:v3
       volumes:
         # 1. System files and timeline layouts on your fast SSD
         - ./data:/data
         # 2. Main write-access library for new phone uploads on your HDD
         - D:/ImmichData/Originals:/data/library
         # 3. Your Master Canon/Archive folder on your HDD (Protected as strict Read-Only)
         - D:/Pictures:/external-pictures:ro
       env_file:
         - .env
       environment:
         TZ: Europe/London
       ports:
         - 2283:2283
       depends_on:
         - redis
         - database
       restart: always
       healthcheck:
         disable: false

     immich-machine-learning:
       container_name: immich_machine_learning
       # image: ghcr.io/immich-app/immich-machine-learning:release
       image: ghcr.io/immich-app/immich-machine-learning:v3
       volumes:
         # Keeps ML model downloads cached on your fast SSD
         - ./model-cache:/cache
       restart: always
       healthcheck:
         disable: false

     redis:
       container_name: immich_redis
       # Immich now uses Valkey due to Redis licensing changes
       image: docker.io/valkey/valkey:9@sha256:418652cfb58ef879d4978c33553735d7147016032d5aefaa14c828e611eb9dfd
       # image: docker.io/redis:6.2-alpine
       healthcheck:
         test: redis-cli ping | grep -q PONG || exit 1
       restart: always

     database:
       container_name: immich_database
       # The official, highly optimized v3 VectorChord database image
       image: ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0@sha256:bcf63357191b76a916ae5eb93464d65c07511da41e3bf7a8416db519b40b1c23
       # image: ghcr.io/immich-app/postgres:14-vectorchord0.4.3
       env_file:
         - .env
       environment:
         POSTGRES_PASSWORD: ${DB_PASSWORD}
         POSTGRES_USER: ${DB_USERNAME}
         POSTGRES_DB: ${DB_DATABASE_NAME}
         POSTGRES_INITDB_ARGS: --data-checksums
         # Optimized for concurrent IO because the DB folder sits on your SSD
         DB_STORAGE_TYPE: SSD
       volumes:
         # Active database tracking folder remains right here on your C: Drive SSD
         - ${DB_DATA_LOCATION}:/var/lib/postgresql/data
       shm_size: 128mb
       restart: always
       healthcheck:
         disable: false
   ```

## 5. Launch the Immich Docker container 

1. Open **Command Prompt** and type:

   ```cmd
   docker compose up -d
   ```

2. Give the container about 15 seconds to map out the new folder layers, then type this command to verify the status:

   ```cmd
   docker compose ps
   ```

Check the **STATUS** column, `immich_server` should show up as `Up (healthy)`, you may have to give it time. If it seems like it's in a restarting loop, then something likely went wrong. Ensure there is a `.immich` file inside `D:\ImmichData\Originals`.


## 6. Update your Caddyfile 

1. Open your existing `Caddyfile`, in `C:\caddy\`.
2. Replace the old Jellyfin routing block with this:

   ```caddy
   # New Jellyfin Endpoint
   jellyfin.<YOUR_SERVER'S_DUCKDNS_DOMAIN>.duckdns.org:8443 {
       bind <YOUR_SERVER'S_LOCAL_IP>
   
       # Use the DNS challenge for SSL certificates
       tls {
           dns duckdns 152044c1-98ad-4f0c-9fe4-e2a9ebdf3049
       }
   
       # Proxy to your local Jellyfin instance
       reverse_proxy <YOUR_SERVER'S_LOCAL_IP>:8096
   }
   
   # New Immich Endpoint
   immich.<YOUR_SERVER'S_DUCKDNS_DOMAIN>.duckdns.org:8443 {
       bind <YOUR_SERVER'S_LOCAL_IP>
       tls {
           dns duckdns 152044c1-98ad-4f0c-9fe4-e2a9ebdf3049
       }
       reverse_proxy <YOUR_SERVER'S_LOCAL_IP>:2283
   }
   ```

   ensuring to add your server's local IP, which can be found using the command `ipconfig /all` in **cmd**. And add your server's DuckDNS domain.

   You now access Jellyfin via: `https://jellyfin.<YOUR_SERVER'S_DUCKDNS_DOMAIN>.duckdns.org:8443`.
   
   And Immich via: `https://immich.<YOUR_SERVER'S_DUCKDNS_DOMAIN>.duckdns.org:8443`.

3. Save the changes to your Caddyfile and reload it with `caddy reload` or `caddy run --config Caddyfile`.

4. Test if it works by opening a browser on your PC or phone and navigate to ``https://immich.<YOUR_SERVER>.duckdns.org:8443``. If it loads the Immich Welcome page, it worked!

## 7. Create your Immich Admin account 

Once on the Immich Welcome page, click **Getting Started**, it will prompt you to enter an **Email Address**, a **Name** (just use your first name), and create a **Password**. This creates your master Admin account. Just stick to the default settings for most options.

At this point you can also install the Immich Mobile App and login using your newly created account.

## 8. Transfer photos onto your Immich server 

Before you start transferring photos onto your Immich server, you may want to adjust the number of concurrent jobs when Immich processes hundreds of newly uploaded images. 

1. On a browser (this option isn't accessible on the mobile app), go to your Immich server website, click on your profile picture and click **Admiinistration**.
2. Click **Job Settings**
3. If you have a low end CPU (i7-3770 or lower) and/or a cheap CPU fan, I recommend you use the following settings:

   * Generate Thumbnail concurrency: **1**
   * Extract metadata concurrency: **5** 
   * External Libraries concurrency: **5** 
   * Sidecar metadata concurrency: **5** 
   * Smart Search concurrency: **2** 
   * Face detection concurrency: **1** 
   * Facial Recognition concurrency: **1** 
   * Transcode videos concurrency: **1** 
   * Storage template migration concurrency: **1** 
   * Migration concurrency: **5** 
   * OCR concurrency: **1** 

Now you can start uploading photos from your phone onto Immich. Immich will automatically handle folder structure, thumbnails, transcoding, metadata, facial recognition, etc.

You can see the active and waiting jobs by going to **Admiinistration** and clicking **Job Queues** on the left column. Here you can also start, stop, pause, and rescan specific jobs.

To setup the External Library for DSLR pictures, go back to the web browser dashboard:

1. Click **Admiinistration**.
2. On the left column click **External Libraries**.
3. Click **Create Library**.
4. Rename the external library whatever you want, e.g. `Canon 80D Archive`.
5. Click on it and click **Add** in the **Folders** section.
6. Enter `/external-pictures` into **Path**.
7. (Optional) For DSLR RAW images I would recommend adding a new **Exclusion pattern**: `**/*.CR2.xmp`.

And at last we're done! You can now upload all your phone pictures/videos, and DSLR pictures onto Immich and Immich will handle the rest. You can then manually create albums, add users, create links, etc.

Congrats on setting up your own private cloud photo/video storage on your home server that you can access anywhere!
