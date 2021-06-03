---
title: Create a contact form with a Telegram bot
catagory: tech
description: Create a contact form for your website with minimal code using the Telegram bot API
---

Contact forms are an integral part of most websites that offer any kinds of service or expect the user to make direct contact. There are many different ways to integrate contact forms, but last year, I came up with one that is very simple to implement and provides a load of useful features which would be more tricky to implement manually.
Telegram is an instant messaging client with privacy at the forefront of it's design. It's certainly my favorite IM client, and it also several fantastic social features. Telegram's Channel feature allows users to subscribe to a channel and recieve notifications from a single user. This is great for artists posting their art or giving commission status updates or groups sending out notifications about upcomming events.
Telegram channels also has another neat feature. They can be used in tandom with Telegram bots to send messages automatically. In this tutorial, I will show you how to use this feature to create a contact form for a website.
This approach is quite simple and gives a lot of flexibility. Firstly, you don't need a backend at all to implement this, but you can use one if you want more security or customization. Next, you'll have the ability for multiple people to recieve the contact messages. This is particularly useful if you're working with a team, and everyone should have access to the messages. Lastly, you'll get these messages on your phone instantly, so you won't have to check your email to see them.

## Telegram Setup

### Joining Telegram
The first thing you're going to need to do, if you haven't already, is sign up for a Telegram account. It's free and all you'll need is a phone number.
[Sign Up Here](https://telegram.org)
Once you have your account, install it on your PC or Phone. I'll be providing instructions for and screenshots the PC version, but you should be able to follow along on mobile with no issues.

### Creating the Bot
We'll need to create the bot that we'll use to send our messages. To manage our bots, we'll have to interact with the special bot Telegram has created.
In the telegram app, drag from the left to extend the sidebasr of contacts if it's collapsed.
In the searchbar at the top, enter @BotFather and click the bot that shows up. 
![Searching for @botfather](botsearch.png)

Click the Start button at the bottom of the chat and you should now be in a chat with the Botfather.
![Talking to Botfather](botfather.png)
Click the /newbot link in his message or type it into the chat.
You should now be able to just follow BotFather's instructions and name your bot and give it a username ending in "bot"
![Chat with botfather](botfatherchat.png)
Once your bot is created, copy your authorization token to a secure location.

### Creating the Channel

In the telegram app, open the sidebar with the hamburger menu in the top left corner and click **New Channel**
![Press New Channel](newchannel.png)
Next, give the channel a name (I would suggest <\Website Name\> Notifications), and optionally a photo to easily recognize the channel at a glance.
![Create New Channel](createchannel.png)
Set the channel to private, as we don't want any kind of contact info being available to anyone we haven't authorized to join the channel.
![Private Channel](privatechannel.png)
When you're asked to add members to the channel, enter the name of your newly created bot in the search bar and select it.
At this time, you can also add other people to the channel so they will get notified when new contact messages are submitted, but you'll have the option to do this at any time later as well.
![Adding bot to the channel](addbot.png)
Affirm the prompt to add the bot a channel admin.
Finaly, you'll be able to set the bot's scope of permissions. Only enable posting messages, as that'll all we'll need for this channel.

### Getting the Channel ID
Now that we have the channel, we'll need the channel ID. There isn't an easy way to just grab it yet, so we're going to use a telegram utility bot called JSON Dump Bot.
Send a message in your channel, then right click it and select **Forward**.
In the searchbar, search for JSONDumpBot, select it, and press start. This bot should reply with a message containing all the JSON data of the message we just forwarded. Ignore the first message (in response to the /start command). Look for the Chat ID and save it for later.

### Testing our bot
The way this works, is we send a message to the channel with the bot as the user. This is done by making a GET request to the telegram API.
The information about this request can be found in the Telegram API documentation:
https://core.telegram.org/bots/api#sendmessage

You will need the bot token we got earlier as well as the channel ID

The request will look like this:

```
GET https://api.telegram.org/bot<token>/sendMessage?chat_id=<channel_id>&text=<Message Text>
```

Example:

```
https://api.telegram.org/bot1690645634:AAExqRiM5ECBOGZ0yhP1p57Iwk2njDaLIYs/sendMessage?chat_id=-1001274004245&text=Hello,+World!
```

Once you've constructed this link, paste it into your browser or desired HTTP client such as Insomnia or Postman
If this works, you should recieve a message in the Telegram channel containing your text.

## Building a contact form
With these steps completed, you'll be ready to implement the actual contact form.

This part can be done pretty much any way you want. All we have to do is add a place for users to enter some information and a button that will send the Telegram request.

Here's an example with the HTML form element, which require no script code.

```html
<h2>Contact Us</h2>
<form action="https://api.telegram.org/bot1690645634:AAExqRiM5ECBOGZ0yhP1p57Iwk2njDaLIYs/sendMessage">
	<input type="hidden" name="chat_id" value="-1001274004245">
	<p>Please provide your reqeust and a way for us to get back to you (email, phone number, Myspace ID, etc)
	<input type="text" name="text" value="Hello, world!">
	<input type="submit">
</form>
```

If you want to customize your contact form further, you can build it like a regular form, and combine the values of the form elements into a single text string then send the request with javascript.

Example of the request with Javascript:

```HTML
```

## Enhancing Security

These are both very simple ways to have your users send requests and contact you, but there is a potential security issue here. 

To make the request, all you need is the Bot ID, meaning anyone that has it can make the requests.
