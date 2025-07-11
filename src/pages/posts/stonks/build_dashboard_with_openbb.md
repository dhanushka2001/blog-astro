---
title: "Streamlining Technical Analysis with OpenBB and Streamlit"
description: Web app that uses openbb-sdk to display technical analysis graphs for a given stock
alt: Applying nlp to various youtube videos
pubDate: Friday, 12 March 2023 13:00:00 GMT
tags: ["openbb", "streamlit", "python", "pandas"]
layout: '@/templates/BasePost.astro'
imgSrc: '/imgs/sample.png'
imgAlt: 'rbc stock analyzer'
authors: [David Li]
---

This project is a Streamlit app that uses openbb-sdk to display technical analysis graphs for a given stock. The app allows the user to input a ticker symbol, start date, and end date in the sidebar, and then displays a line chart of the stock's adjusted close price, as well as a Bollinger Bands graph using the openbb-sdk. The Bollinger Bands graph is saved to an image file and then displayed in the app.

```python
today = datetime.date.today()
def user_input_features():
    ticker = st.sidebar.text_input("Ticker", 'ZIM')
    start_date = st.sidebar.text_input("Start Date", '2020-05-01')
    end_date = st.sidebar.text_input("End Date", f'{today}')
    # ta_range = st.sidebar.number_input("TA Range", min_value=1, max_value=50)
    return ticker, start_date, end_date # , ta_range

symbol, start, end = user_input_features()
```

The user_input_features() function is used to get the user input from the sidebar. The user can input a ticker symbol, start date, and end date. The start date and end date are used to get the stock data from the yfinance API. The ticker symbol is used to get the company name from the yfinance API using the open bb load utility.


```python
@st.cache  # 👈 Added this
def build_bbands_img(data, symbol, file_name="sample.png"):
    ...
    pass
```


To improve the performance of the app, you can use Streamlit's @st.cache decorator on the build_bbands_img() function. This will enable caching of the results of the function, so that it is only executed when the input values change. This can help reduce the time it takes to generate the Bollinger Bands image, especially if the user is repeatedly requesting the same data. 

```python
stream = os.popen('cd ~ && pwd')
root_dir = stream.read()
# /home/codespace/OpenBBUserData/exports/temp.png
# find root directory/OpenBBUserData/exports
sample_dir = root_dir.strip()
# root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
temp_image = os.path.join(sample_dir, "OpenBBUserData", "exports", file_name)
```

The code above is used to find the root shell directory of the project. This is used to find the location of the image file that is generated by the openbb-sdk. The image file is then displayed in the app using Streamlit's st.image() function.

```python
bbands_img = build_bbands_img(data, symbol, "bbands.png")
# plot ta using open bb sdk in streamlit
st.header(f"Bollinger Bands\n {company_name}")
# 
# if bbands.png exists, display it

if bbands_img:
    st.image(bbands_img, caption='Sunrise by the mountains')
```


To view the full app go to https://friendlyuser-stonk-ta-app-app-fhrcso.streamlit.app/


and view the source code at

https://github.com/FriendlyUser/stonk_ta_app