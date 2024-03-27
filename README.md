# DryCleanChat - A Dry Cleaning Assistance Chatbot

**Version 1.0.0**

This project leverages OpenAI's [GPT-4 Vision](https://openai.com/blog/chatgpt-can-now-see-hear-and-speak) for advanced image recognition, alongside [DALL·E 3](https://openai.com/dall-e-3) for top-notch image generation capabilities. Integrated with the [Chat Completions API](https://platform.openai.com/docs/guides/gpt/chat-completions-api), DryCleanChat offers a unique way to interact with customers, providing assistance through image analysis and generation.

---

**Updated**: Utilizes [v4.19.1 OpenAI Node module](https://www.npmjs.com/package/openai) for improved functionality.

## Motivation

Initiated to incorporate GPT-4's image analysis into customer service, this project has evolved with the introduction of image input capabilities. Initially substituting image input with ml5's ImageClassifier for basic object recognition, the project now fully integrates the latest in image recognition and generation technology for enhanced customer interactions.

## DryCleanChat Features

DryCleanChat empowers users to:
- Upload images of garments for cleaning advice or stain treatment suggestions.
- Get estimates for dry cleaning services directly through chat.
- Inquire about service timeframes and check the status of their orders.



## GPT-4 Vision

For image analysis, we will be using the new [GPT-4 with Vision](https://platform.openai.com/docs/guides/vision), currently still in ***preview mode*** which means we only got **100 RPD**!

In the app, there are two ways to send image for analysis: send image with query and refer to any image in the conversation.

Currently, you can send as many as 10 images when you send your query. You can edit the number from `next.config.js` file:

```javascript
env: {
    ...
    maxFileUploadCount: 10,
},
```

When you refer to an image in the conversation for image analysis, function calling will be triggered:

```javascript
{
    "name": "get_image_for_analysis",
    "description": "Get image data referenced by the user from conversation history",
    "parameters": {
        "type": "object",
        "properties": {
            "images": {
                "type": "array",
                "description": "An array of the image data referenced by the user, in URL form",
                "items": {
                    "type": "string",
                    "description": "Image data represented by a relative URL"
                }
            },
            "query": {
                "type": "string",
                "description": "Query of the user"
            }
        },
        "required": ["images", "query"]
    }
}
```

Here is the sample output

```javascript
{
  images: [ '/uploads/tmp170061562847486897_yasai.jpeg' ],
  query: 'Identify long green vegetable'
}
```

The GPT-4V supports image input either via URL or Base64 image. If URL, we will need it hosted somewhere with https. But we are using relative paths!
No problemo. We have all the image files saved in the `/public/uploads` directory.

When you send image with the query, we first upload the image and only send the relative url and base64 data with the query.

When you refer to an image from the conversation, we use the relative path to get to the image file and encode it to base64.

So, we are always sending base64 image data!

### DryCleanChat - Handling Images

DryCleanChat supports image uploads for better assistance. Here's how images are processed and analyzed:

**Sample Output:**

```json
{
  "images": ["/uploads/tmp170061562847486897_yasai.jpeg"],
  "query": "Identify long green vegetable"
}
```

### ML5 Image Classifier

Before updating the app to incorporate `gpt-4-vision` for image analysis, I was using [ml5's ImageClassifier](https://learn.ml5js.org/#/reference/image-classifier).

To use it, you must first load the model. Here, I'm using `MobileNet`.
```javascript
const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!');
}
```

There are other models available depending on your specific needs, such as `Darknet` and `DoodleNet`. Alternatively, you can load the model from a local directory. Please refer to the [usage section](https://learn.ml5js.org/#/reference/image-classifier?id=usage) for more information.

Once the model is loaded, you can use it to your heart's content since it's free!
```javascript
classifier.classify(document.getElementById('image'), (err, results) => {
  console.log(results);
});
```

Here's an example of a typical output
```javascript
const image_result = [
    {
        "label": "banana",
        "confidence": 0.9664063453674316
    },
    {
        "label": "slug",
        "confidence": 0.0016748382477089763
    },
    {
        "label": "zucchini, courgette",
        "confidence": 0.0012184377992525697
    }
]
```

To integrate this with OpenAI's Chat Completion API, you can either append this to the system prompt or use function calling and insert it as a result of the function.
```javascript
message.push({ role: 'assistant', content: null, function_call: { name: 'analyse_image', arguments: '{\n  "inquiry": "fruit"\n}'}})
message.push({ role: 'function', name: 'analyse_image', content: JSON.stringify({ result: image_result }) })
```

Occasionally, it produces unexpected results, which can add an element of surprise and make a game app more engaging.


# Setup

Clone the repository and install the dependencies

```sh
git clone  myproject

cd myproject

npm install
```

Copy `.env.example` and rename it to `.env` then edit the `OPENAI_API_KEY` and use your own `OpenAI API key`.

```javascript
OPENAI_API_KEY=YOUR-OPENAI-API-KEY
```

Then run the app

```sh
npm run dev
```

Open your browser to `http://localhost:4000/` to load the application page.
