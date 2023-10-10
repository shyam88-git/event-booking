const express = require('express');
const router = express.Router();

/* Event Router
   Usage: Upload an event
   URL: http://127.0.0.1:5000/api/events/upload
   Params: name, image, date, type, price, info
   Access: Private
*/


    
       

        
        
        

        

   


    

/* EVENT Router
   USAGE: Get Free Events
   URL: http://127.0.0.1:5000/api/events/free
   Params: None
   Access: Public
   Method: GET
*/

router.get('/free', async (request, response) => {
    try {
        response.json({ msg: 'Get Free events is here' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ msg: 'Internal server error' });
    }
});

/* Event Router
   Usage: Get Pro Events
   URL: http://127.0.0.1:5000/api/events/pro
   Params: None
   Access: Private
   Method: GET
*/

router.get('/pro', async (request, response) => {
    try {
        response.json({ msg: 'Get Pro events' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ msg: 'Internal server error' });
    }
});

module.exports = router;
