const dialogflow = require("@google-cloud/dialogflow");
const { WebhookClient, Suggestion, Payload } = require("dialogflow-fulfillment");
const express = require("express")
const cors = require("cors");
const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3000;

app.post("/webhook", async (req, res) => {
    // var id = (res.req.body.session).substr(43);
    // console.log(id)
    const agent = new WebhookClient({ request: req, response: res });


    function hello(agent) {
        console.log(`intent  =>  hello`);
        // agent.add("Hello from server")
        const responses = [
            "Welcome to StyleStride! How can I assist you today?",
            "Hey there from StyleStride! Ready to explore our latest products and promotions?",
            "Greetings from StyleStride! Looking for something specific or just browsing?",
            "Hi from StyleStride! Excited to help you find the perfect items. What are you in the mood for?",
            "Hello from StyleStride! What can I assist you with today?",
            "Hi there from StyleStride! Ready to discover the latest trends and deals?",
            // Add more responses as needed
        ];

        const response2 = [
            "StyleStride have two products for the right now. Let's have a look.",
            "Currently, StyleStride offer two products for you. Let's have a look.",
            "Right now, StyleStride has a selection of two products for you. Let's have a look.",
            "At the moment, our inventory includes two products for you. Let's have a look.",
            "Presently, StyleStride is featuring two products for you. Let's have a look.",
            "StyleStride has two great products which are available for you right now. Let's have a look."
        ]


        // Randomly select a response from the array
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const randomResponse1 = response2[Math.floor(Math.random() * response2.length)];

        // Send the selected response to the user
        agent.add(randomResponse);
        agent.add(randomResponse1);

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Clothes",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://thumbs.dreamstime.com/z/clothes-set-17119588.jpg"
                                    }
                                }
                            },
                            {
                                "text": "Shoes",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt2RVxggeo58Gi0sJzT5phwcardw09-X9UeouhgvYe_2X4MVUyAtm68d2JoblEu_SOFZc&usqp=CAU"
                                    }
                                }
                            },
                            {
                                "text": "Discounts",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));

    }

    // Clothes Intent section
    function clothes(agent) {
        console.log(`intents => clothes`);

        const intentName = agent.intent;

        if (intentName === 'ClothesDetails') {
            // Extract product details from the request
            const name = agent.parameters['product'][0];
            const quantity = parseInt(agent.parameters['quantity'][0], 10) || 0;
            const color = agent.parameters['color'][0];
            const size = agent.parameters['size'][0];
            const price = getPriceForSize(size);

            console.log('Received Product Name:', name);
            console.log('Received Quantity:', quantity);
            console.log('Received Color:', color);
            console.log('Received Size:', size);
            console.log('Received Price:', price);

            const totalPrice = price * quantity;

            // Generate response based on the product details
            const responseText = `Great! As selected ${size} size. The price for this size is ${price}Rs. Your total and final price is ${totalPrice}Rs.`;

            const responseText1 = `As your selected things are: ${quantity} ${name} with the selected color of ${color} and the ${name} size are ${size}. Are you sure to cart these? Yes or No`

            agent.add(responseText);
            agent.add(responseText1);
        } else {
            // Send a default response
            agent.add('Default response');
        }
    }

    // Function to get the price for a given jeans size
    function getPriceForSize(size) {
        const sizePriceMap = {
            'small': 500,
            'medium': 800,
            'large': 1000
            // Add more sizes and prices as needed
        };

        // Ensure size is a string before converting to lowercase
        const normalizedSize = typeof size === 'string' ? size.toLowerCase() : '';

        // Return the price for the given size, default to 0 if not found
        return sizePriceMap[normalizedSize] || 0;
    }

    function yesIntent(agent) {
        console.log(`intents => yesIntents`)

        const response = [
            `Fantastic! Your order is almost complete and it is ready to deliver just need some more info to deliver at correct place. \n Tell me your good name please?`
        ]
        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];

        agent.add(randomResponse)
        // // Call the personalInfo function to provide additional response
        // personalInfo(agent);
    }

    function personalInfo(agent) {

        console.log(`intents => personalInfo`)

        const response = [
            `Great! I am all done and finally your order will be delivered after 7 working days. Thank You so much for ordering at StyleStride!`
        ]
        const response1 = [
            `For more Details`
        ]

        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];
        agent.add(randomResponse)
        const randomResponse1 = response1[Math.floor(Math.random() * response1.length)];
        agent.add(randomResponse1)

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Whatsapp",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png"
                                    }
                                },
                                "link": "https://wa.me/3192919249",
                                "style": {
                                    "type": "text",
                                    "color": "#007BFF",
                                    "link": true
                                }
                            },
                            {
                                "text": "Website",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Facebook",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://img.freepik.com/premium-vector/vinnitsyaukrainejanuary-24-2021facebook-vector-image-flat-icon-with-letter-f-blue-color-button-with-letter-isolated-white-background_736051-65.jpg"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Email Us",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Email-icon.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));

    }

    function noIntent(agent) {
        console.log(`intents => noIntent`)

        const response = [
            `Okay! As you make your mind so your order has removed from delivery cart. And if you want products in future from StyleStride please feel free to visit here. Thank You!`,
            // Add more response prompts as needed
        ];
        const response1 = [
            `For more details`
        ]

        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];
        agent.add(randomResponse)
        const randomResponse1 = response1[Math.floor(Math.random() * response1.length)];
        agent.add(randomResponse1)

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Whatsapp",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png"
                                    }
                                },
                                "link": "https://wa.me/3192919249",
                                "style": {
                                    "type": "text",
                                    "color": "#007BFF",
                                    "link": true
                                }
                            },
                            {
                                "text": "Website",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Facebook",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://img.freepik.com/premium-vector/vinnitsyaukrainejanuary-24-2021facebook-vector-image-flat-icon-with-letter-f-blue-color-button-with-letter-isolated-white-background_736051-65.jpg"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Email Us",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Email-icon.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
    }





    // Shoes Intent section
    function shoes(agent) {
        console.log(`intents => shoes`);

        const intentName = agent.intent;

        if (intentName === 'ShoesDetails') {
            // Extract product details from the request
            const shoesname = agent.parameters['shoesname'];
            const number = agent.parameters['number'];
            const color = agent.parameters['color'];
            const shoessize = agent.parameters['shoessize'];
            const shoesprice = getPriceForShoesSize(shoesname, color, shoessize);

            console.log('Received Product Name:', shoesname);
            console.log('Received Number:', number);
            console.log('Received Color:', color);
            console.log('Received shoessize:', shoessize);
            console.log('Received Price:', shoesprice);

            const totalPrice = shoesprice * number;

            // Generate response based on the product details
            const responseText = `Great! As selected ${shoessize} size. The price for this size is ${shoesprice}Rs. Your total and final price is ${totalPrice}Rs.`;

            const responseText1 = `As your selected things are: ${number} ${shoesname} with the selected color of ${color} and the ${shoesname} size is ${shoessize}. Are you sure to cart these? Yes or No`;

            agent.add(responseText);
            agent.add(responseText1);
        } else {
            // Send a default response
            agent.add('Default response');
        }
    }

    // Function to get the price for a given shoe size
    function getPriceForShoesSize(shoesname, color, shoessize) {
        const shoePrices = {
            'nike': {
                'running': {
                    'sizes': ['40', '41', '42'],
                    'prices': {
                        '40': 2000,
                        '41': 2500,
                        '42': 3000,
                        // Add more sizes and prices as needed
                    },
                },
            },
            'adidas': {
                'running': {
                    'sizes': ['40', '41', '42'],
                    'prices': {
                        '40': 1500,
                        '41': 2000,
                        '42': 2200
                        // Add more sizes and prices as needed
                    },
                },
            },
            'puma': {
                'running': {
                    'sizes': ['40', '41', '42'],
                    'prices': {
                        '40': 2200,
                        '41': 2400,
                        '42': 2700
                        // Add more sizes and prices as needed
                    },
                },
            },
            // Add more brands as needed
        };

        // Ensure size is a string before converting to lowercase
        const normalizedShoesname = shoesname && shoesname.toString().toLowerCase();
        const normalizedStyle = 'running'; // Assuming 'running' is the default style

        // Check if the brand, style, and size exist in the shoePrices object
        if (shoePrices[normalizedShoesname] && shoePrices[normalizedShoesname][normalizedStyle]) {
            const availableSizes = shoePrices[normalizedShoesname][normalizedStyle]['sizes'];

            console.log('Available sizes:', availableSizes);
            console.log('Normalized size:', shoessize);

            // Extract the first element of the shoessize array
            const selectedSize = shoessize && shoessize.length > 0 ? shoessize[0] : null;

            if (availableSizes.includes(selectedSize)) {
                const price = shoePrices[normalizedShoesname][normalizedStyle]['prices'][selectedSize];
                console.log(`Found price for ${normalizedShoesname} in size ${selectedSize}: ${price}`);
                return price;
            } else {
                console.log(`Size ${selectedSize} not found for ${normalizedShoesname}`);
            }
        } else {
            console.log(`Brand or style not found for ${normalizedShoesname}`);
        }

        return 0; // Default price if not found
    }

    function shoesYesIntent(agent) {
        console.log(`Intent => shoesYesIntent`)

        const response = [
            `Fantastic! Your order is almost complete and it is ready to deliver just need some more info to deliver at correct place. \n Tell me your good name please?`
        ]
        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];

        agent.add(randomResponse)
    }

    function shoesPersonalInfo(agent) {

        console.log(`intents => personalInfo`)

        const response = [
            `Great! I am all done and finally your order will be delivered after 7 working days. Thank You so much for ordering at StyleStride!`
        ]
        const response1 = [
            `For more details`
        ]

        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];
        agent.add(randomResponse)
        const randomResponse1 = response1[Math.floor(Math.random() * response1.length)];
        agent.add(randomResponse1)

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Whatsapp",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png"
                                    }
                                },
                                "link": "https://wa.me/3192919249",
                                "style": {
                                    "type": "text",
                                    "color": "#007BFF",
                                    "link": true
                                }
                            },
                            {
                                "text": "Website",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Facebook",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://img.freepik.com/premium-vector/vinnitsyaukrainejanuary-24-2021facebook-vector-image-flat-icon-with-letter-f-blue-color-button-with-letter-isolated-white-background_736051-65.jpg"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Email Us",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Email-icon.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));

    }

    function shoesNoIntent(agent) {
        console.log(`intents => noIntent`)

        const response = [
            `Okay! As you make your mind so your order has removed from delivery cart. And if you want products in future from StyleStride please feel free to visit here. Thank You!`,
            // Add more response prompts as needed
        ];

        const response1 = [
            `For more details`
        ]

        // Randomly select a response from the array
        const randomResponse = response[Math.floor(Math.random() * response.length)];
        agent.add(randomResponse)
        const randomResponse1 = response1[Math.floor(Math.random() * response1.length)];
        agent.add(randomResponse1)

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Whatsapp",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png"
                                    }
                                },
                                "link": "https://wa.me/3192919249",
                                "style": {
                                    "type": "text",
                                    "color": "#007BFF",
                                    "link": true
                                }
                            },
                            {
                                "text": "Website",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Facebook",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://img.freepik.com/premium-vector/vinnitsyaukrainejanuary-24-2021facebook-vector-image-flat-icon-with-letter-f-blue-color-button-with-letter-isolated-white-background_736051-65.jpg"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Email Us",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Email-icon.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));
    }

    // Discount Intent
    function discounts(agent) {
        console.log(`intents => discounts`);

        const response = [
            "Sorry☹️! There are no discounts available in any products right now. Please Check discount offers in every last week of a month. Thank you from StyleStride"
        ]
        const response1 = [
            "For more details"
        ]
        const randomResponse = response[Math.floor(Math.random() * response.length)];
        agent.add(randomResponse)
        const randomResponse1 = response1[Math.floor(Math.random() * response1.length)];
        agent.add(randomResponse1)

        // // Modify your handleWhatsAppChipClick function to open the WhatsApp link
        // function handleWhatsAppChipClick() {
        //     const phoneNumber = '3192919249'; // Replace with the actual WhatsApp number
        //     const whatsappLink = `https://wa.me/${phoneNumber}`;

        //     // Open the WhatsApp link in the default browser
        //     open(whatsappLink);
        // }

        const payload = {
            "richContent": [
                [
                    {
                        "type": "chips",
                        "options": [
                            {
                                "text": "Whatsapp",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://png.pngtree.com/element_our/sm/20180626/sm_5b321c99945a2.png"
                                    }
                                },
                                "link": "https://wa.me/3192919249",
                                "style": {
                                    "type": "text",
                                    "color": "#007BFF",
                                    "link": true
                                }
                            },
                            {
                                "text": "Website",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://w7.pngwing.com/pngs/845/161/png-transparent-sneakers-shoe-shoes-fashion-baby-shoes-monochrome-thumbnail.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Facebook",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://img.freepik.com/premium-vector/vinnitsyaukrainejanuary-24-2021facebook-vector-image-flat-icon-with-letter-f-blue-color-button-with-letter-isolated-white-background_736051-65.jpg"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            },
                            {
                                "text": "Email Us",
                                "image": {
                                    "src": {
                                        "rawUrl": "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/256/Email-icon.png"
                                    }
                                }
                                ,
                                "link": "mailto:anuskhalil77@gmail.com"
                            }
                        ]
                    }
                ]
            ]
        };
        agent.add(new Payload(agent.UNSPECIFIED, payload, { rawPayload: true, sendAsMessage: true }));

        // // Add a new endpoint to handle WhatsApp chip clicks
        // app.post("/whatsapp-click", (req, res) => {
        //     handleWhatsAppChipClick();
        //     res.sendStatus(200);
        // });

    }

    function fallBack(agent) {
        console.log(`intent  =>  Fallback`);
        // agent.add("Fallback from server side.")

        const responses = [
            "I didn't get that. Can you say it again?",
            "I missed what you said. What was that?",
            "Sorry, could you say that again?",
            "Sorry, can you say that again?",
            "Sorry, I didn't get that. Can you rephrase?",
            "I didn't get that. Can you repeat?",
            "Say that one more time?",
        ];

        // Randomly select a response from the array
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        // Send the selected response to the user
        agent.add(randomResponse);
    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', hello);
    intentMap.set('Default Fallback Intent', fallBack);
    intentMap.set('ClothesDetails', clothes);
    intentMap.set('YesIntents', yesIntent);
    intentMap.set('NoIntent', noIntent);
    intentMap.set('PersonalInfo', personalInfo);
    intentMap.set('ShoesDetails', shoes);
    intentMap.set('ShoesYesIntent', shoesYesIntent);
    intentMap.set('ShoesNoIntent', shoesNoIntent);
    intentMap.set('ShoesPersonalInfo', shoesPersonalInfo);
    intentMap.set('Discounts', discounts);
    agent.handleRequest(intentMap);
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});