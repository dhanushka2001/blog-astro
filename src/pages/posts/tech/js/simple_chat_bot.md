---
title: Simple Chat bot using react-simple-chatbot
description: How to create a simple chat bot using react-simple-chatbot
pubDate: Saturday, 18 August 2023 13:00:00 GMT
tags: ["js", "chatbot"]
layout: '@/templates/BasePost.astro'
imgSrc: '/imgs/2023/3793215953.png'
authors: [David Li]
---

This code is a React component that creates a simple chatbot using the "react-simple-chatbot" library. The chatbot has several steps, each with a message and options for the user to choose from. The options determine which step to trigger next. The final step ends the chatbot session with a message "Awesome! You finished my summary." The `<ChatBot />` component takes in the steps prop, which is an array of objects, each representing a step in the chatbot conversation. The component is exported and rendered in the returned JSX of the App function, it will show a simple chatbot with a few steps.

```ts
import React from 'react';

import ChatBot from 'react-simple-chatbot';

const steps=[
      {
        id: '1',
        message: 'Hi, I am David, an inspired programming eager to learn more about the latest technologies.',
        trigger: '2',
      },
      {
        id: '2',
        options: [
          { value: 1, label: 'Want to learn more about me?', trigger: '3' },
          { value: 2, label: 'Close this Menu', trigger: '100' },
        ],
      },
      {
        id: '3',
        message: 'In high school I was interested in computers and technologies, so I took information technologies classes that focused on game development.',
        trigger: '4',
      },
	  {
	    id: '4',
        options: [
          { value: 1, label: 'Want to learn even more about me?', trigger: '5' },
          { value: 2, label: 'Close this Menu', trigger: '100' },
        ],
	  },
	  {
        id: '5',
        message: 'In University I learned about the underlying hardware and software that comprise computers. However, in my spare time, I learnt web development, typography (latex), and general programming knowledge.',
        trigger: '6',
      },
	  {
	    id: '6',
        options: [
          { value: 1, label: 'Continue?', trigger: '7' },
          { value: 2, label: 'Close this Menu', trigger: '100' },
        ],
	  },
	  {
        id: '7',
        message: 'On my 1st and 2nd co-op terms, I learnt about the software development lifecycle, commonly used agile tools (JIRA and Confluence), as well as scripting and data analysis. My third co-op term covered BlockChain Technologies.',
        trigger: '100',
      },
      {
        id: '100',
        message: 'Awesome! You finished my summary.',
        end: true,
      },
    ];

export default function App() {
  return (
    <div className="app">
      <h4>Simple Chat App</h4>
		<div>
			<ChatBot steps={steps} />
		</div>,
    </div>
  );
}
```

Implementing chat bot on page, using iframe (couldnt figure out how to show this using mdx outside of a iframe). 
<iframe src="https://friendlyuser.github.io/Simple-Chat-Bot-in-React"  width="100%" height="500px">
</iframe>


Alternatively you can preview the bot at 

https://friendlyuser.github.io/Simple-Chat-Bot-in-React/

