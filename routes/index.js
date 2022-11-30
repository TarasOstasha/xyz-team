var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/orders', (req, res) => {
  try {
    let myOrders = [
      { 
        orderN: 1,
        productCode: 'MK100',
        productName: 'SHOES',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
      },
      {
        orderN: 2,
        productCode: 'MK101',
        productName: 'shoes',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']},
      {
        orderN: 3,
        productCode: 'MK102',
        productName: 'SHOES',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
      },
      { orderN: 4,
        productCode: 'MK100',
        productName: 'SHOES',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
      },
      {
        orderN: 5,
        productCode: 'MK101',
        productName: 'SHOES',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']},
      {
        orderN: 6,
        productCode: 'MK102',
        productName: 'SHOES',
        orderInHandDate: new Date('1/1/16'),
        orderStatus: ['Done','In Progress','Hold On', 'Error', 'No Money']
      }
    ];
    const { value } = req.body;
    console.log(req.body)
    res.status(200).json({
      data: value,
      msg: 'successful'
    })
  } catch (error) {
    res.status(501).json({
      err: error,
      msg: 'error occur on the server side'
    })
  }
})

module.exports = router;
