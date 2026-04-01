---
title: How to setup GitHub SSH keys on Linux
description: A guide to configure GitHub SSH keys in Linux, so you don't have to enter your fine-grained personal access token every time you git push/pull, and add a green "Verified" badge to your GitHub commits.
alt: Guide to configure GitHub SSH keys in Linux
tags: ["linux", "github"]
layout: '@/templates/BasePost.astro'
pubDate: 2026-03-31
#updateDate: 2026-03-24
imgSrc: '/imgs/2026/mar/GitHub-SSH-key.jpg'
imgAlt: 'GitHub SSH keys'
authors: [Dhanushka Jayagoda]
---

This guide will show you how to set up SSH keys for multiple GitHub accounts (e.g. Personal and Work) on Linux.

Instead of using HTTPS and personal access tokens, SSH allows you to authenticate securely without repeatedly entering credentials when pushing or pulling repositories. As a bonus, you can also use the same keys to sign your commits and get the “Verified” badge on GitHub.

This guide is written from the perspective of a single Linux machine. If you use multiple devices, you can repeat the same steps on each one.

## 1. Create SSH keys

We will create an SSH key for each GitHub account **and** for each device. For this guide we will just be covering 1 device and 2 GitHub accounts (Personal and Work), so just 2 SSH keys. You _can_ reuse a single SSH key across multiple accounts and devices, but it’s best practice to use a separate key per account **and** per device for better security and easier key management.

We will however be reusing the same SSH key for authentication and signing.

```bash
cd ~/.ssh
ssh-keygen -t ed25519 -C "<YOUR_PERSONAL_EMAIL>" -f ~/.ssh/id_ed25519_personal
ssh-keygen -t ed25519 -C "<YOUR_WORK_EMAIL>" -f ~/.ssh/id_ed25519_work
```

* ``-t ed25519`` — the key type (ED25519 is modern and recommended over the older RSA)
* ``-C "..."`` — a comment/label, usually your email
* ``-f ~/.ssh/id_ed25519_personal`` — the output filename

It will prompt you for a passphrase for both, and then it will generate two files:

``~/.ssh/id_ed25519_personal`` — the private key (never share this)
``~/.ssh/id_ed25519_personal.pub`` — the public key (this is what you give to GitHub)

## 2. Create allowed_signers and config

### ~/.ssh/allowed_signers

1. In ``~/.ssh``, run this command:

   ```bash
   # First command - creates the file and adds personal key
   echo "<YOUR_PERSONAL_EMAIL> $(cat ~/.ssh/id_ed25519_personal.pub)" > ~/.ssh/allowed_signers
   
   
   # Second command - appends work key
   echo "<YOUR_WORK_EMAIL> $(cat ~/.ssh/id_ed25519_work.pub)" >> ~/.ssh/allowed_signers
   ```

   * This creates the file ``~/.ssh/allowed_signers`` with the following format:

     ```
     <YOUR_PERSONAL_EMAIL> <YOUR_PERSONAL_PUBLIC_KEY>
     <YOUR_WORK_EMAIL> <YOUR_WORK_PUBLIC_KEY>
     ```
   
   * Verify it worked (you should see exactly one line per key, ending in a simple $ (shown by ``cat -e`` to indicate line endings):
   
     ```bash
     cat -e ~/.ssh/allowed_signers
     ```

   * Git uses this file to verify commit signatures. If your commit email doesn’t match an entry in ``allowed_signers``, signature verification will fail.

### ~/.ssh/config

2. Also in ``~/.ssh``, create a ``config`` file and paste in this:

   ```
   Host *
       AddKeysToAgent yes
       IdentitiesOnly yes
   
   # Personal (default)
   Host github.com
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_ed25519_personal
   
   # Work (explicit)
   Host github-work
       HostName github.com
       User git
       IdentityFile ~/.ssh/id_ed25519_work
   ```

   * ``IdentitiesOnly yes`` ensures SSH only uses the keys specified in this config, rather than trying every key in your agent (which can cause authentication issues with multiple accounts).
   * ``AddKeysToAgent yes`` tells SSH to automatically cache your key in ssh-agent (Step 5) after the first successful authentication.
   * ``github.com`` is used as the default (personal account), while ``github-work`` is an explicit alias used only for work repositories.

## 3. Add SSH keys to GitHub

1. Login to your Personal GitHub account
2. Go to **Settings > SSH and GPG keys**
3. Click **New SSH key**
4. For the 3 fields:
    * **Title:** Enter something short and simple, preferably to distinguish it from your other devices, like "Laptop"
    * **Key type:** Select "Authentication Key"
    * **Key:** Paste in the Personal account's public key inside ``id_ed25519_personal.pub``
5. Click **Add SSH key**
6. Repeat Steps 3-5 but for **Key type** select "Signing key"
7. Repeat Steps 1-6 but in Step 1 login to your Work GitHub account, and in Step 4 use the Work account's public key inside ``id_ed25519_work.pub``

## 4. Setup .gitconfig

1. Create ``~/.gitconfig``:


   ```
   [user]
     name = <YOUR_NAME>
   
   [gpg]
     format = ssh
   
   [commit]
     gpgsign = true
   
   [url "git@github-work:"]
       insteadOf = https://github.com/<YOUR_WORK_ACCOUNT_NAME>/
   
   [url "git@github.com:"]
       insteadOf = https://github.com/
   
   [includeIf "gitdir:~/Projects/Personal/"]
     path = ~/.gitconfig-personal
   
   [includeIf "gitdir:~/Projects/Work/"]
     path = ~/.gitconfig-work
   
   [gpg "ssh"]
       allowedSignersFile = ~/.ssh/allowed_signers
   ```

   * The ``includeIf`` rules above assume your Work repos live in ``~/Projects/Work/`` and your Personal repos live in ``~/Projects/Personal/``. You can adjust this to whatever project directory structure you prefer.
   * The ``[url ...] insteadOf ...`` rules above mean you can clone repositories using the HTTPS URL from GitHub — Git will automatically rewrite it to use SSH instead of HTTPS based on these rules.
     * Work repositories (``https://github.com/<YOUR_WORK_ACCOUNT_NAME>/...``) are rewritten to use ``git@github-work:``, ensuring the correct SSH key is used.
     * All other GitHub repositories (including other people’s repos) are rewritten to use ``git@github.com:``, which connects to ``github.com`` using your personal SSH key.
     * You can test that the SSH aliasing works:
       
       1. Go to one of your local Personal or Work repo folders
       2. Change the remote URL to the HTTPS URL:
         
          ```
          git remote set-url origin <GITHUB_REPO_HTTPS_URL>
          ```
       3. Run:

          ```
          git remote -v
          ```

          you should see the SSH form ``git@github.com:...`` or ``git@github-work:...``, instead of ``https://github.com/...``

     * ``github-work`` is just an alias — it still connects to github.com, but uses your work SSH key instead.

        ```
        HTTPS URL → git insteadOf → SSH alias → ~/.ssh/config → correct key → github.com
        ```


2. Create ``~/.gitconfig-personal``:


   ```
   [user]
     email = <YOUR_PERSONAL_EMAIL>
     signingkey = /home/<YOUR_USERNAME>/.ssh/id_ed25519_personal.pub
   ```

3. Create ``~/.gitconfig-work``:


   ```
   [user]
     email = <YOUR_WORK_EMAIL>
     signingkey = /home/<YOUR_USERNAME>/.ssh/id_ed25519_work.pub
   ```

### Notes

* git expands ``~`` inconsistently for ``signingkey``. So we use the full path ``/home/<YOUR_USERNAME>`` to be safe.

* This part in ``~/.gitconfig`` is what tells Git to use SSH keys instead of traditional GPG keys for commit signing:

  ```
  [gpg]
      format = ssh
  ```

## 5. Start a background SSH agent automatically

Add this to ``.zshrc`` or your ``.config/zshrc/custom/30-autostart`` file:

```
# 1. Start ssh-agent (background worker) if it's not already running
if ! pgrep -u "$USER" ssh-agent > /dev/null; then
    ssh-agent -s > "$HOME/.ssh/agent.env"
fi

# 2. Tell this specific terminal tab how to talk to that worker
if [[ -z "$SSH_AUTH_SOCK" || ! -S "$SSH_AUTH_SOCK" ]]; then
    source "$HOME/.ssh/agent.env" > /dev/null
fi
```

After making changes to ``zshrc`` config files, run this to reset your terminal:

```bash
exec zsh
```

The SSH agent means we don't have to manually run ``ssh-add ...``. It caches your decrypted key the first time you enter your passphrase when you make your first ``git push/pull`` of the session, so you only enter the passphrase once per login session (until you restart or the agent is cleared).

### Why push/pull caches but commit doesn't

* ``git push/pull`` uses a full SSH connection to GitHub — it opens a socket, authenticates, and transfers data. That SSH connection goes through ``ssh-agent``, and ``AddKeysToAgent yes`` in your ``~/.ssh/config`` tells the agent to cache the key after that authentication.
* ``git commit`` is entirely local — it calls ``ssh-keygen -Y sign`` to cryptographically sign the commit data on your machine. This never opens an SSH connection, so it never touches ssh-agent the normal way, and ``AddKeysToAgent`` never gets a chance to fire.

You don’t need to pull before making local commits, but you should sync with the remote regularly.
Using ``git pull --rebase`` keeps your history clean by avoiding unnecessary merge commits and replaying your work on top of the latest changes.

## Test your setup

* Run these commands:

  ```bash
  ssh -T git@github.com     # personal
  ssh -T git@github-work    # work
  ```
  
  You should see:
  
  ```
  Hi <YOUR_USERNAME>! You've successfully authenticated, but GitHub does not provide shell access.
  ```

  * ``ssh -T ...`` -- Tests authentication with GitHub without opening a shell.
  * ``ssh -vT ...`` -- Adds verbose output, useful if authentication or key selection isn’t working as expected.

* ``ssh-add -l`` -- Lists all keys currently loaded in the agent, showing their fingerprint, comment, and type. Useful for checking if a key is cached.
* ``ssh-add -D`` -- Deletes all keys from the agent, effectively resetting it as if you'd never authenticated this session. Next operation needing a key will prompt for the passphrase again.

* ``git reset --soft HEAD~1`` -- Undo last commit but keep changes staged
* ``git log -1 --show-signature`` -- Show signature of last commit. You should see:

  ```
  Good "git" signature for <YOUR_EMAIL> with ED25519 key SHA256:...
  ```
* ``git remote set-url origin <NEW_URL>`` -- Changes the remote URL if you accidentally cloned a repo with the wrong remote
