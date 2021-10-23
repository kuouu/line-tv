const state = [
  {
    "id":"node_0",
    "type":"node",
    "position":{
      "x":100,
      "y":25
    },
    "title":"State 1",
    "sections":[
      {
          "type":"img",
          "url":"https://media-exp1.licdn.com/dms/image/C561BAQGZqA8gJ2Edpg/company-background_10000/0/1614011974707?e=2159024400&v=beta&t=LMVAHLMDb9k1bPnUbhAfgDAbbwCagwvNnahVrvS7vkg"
      },
      {
          "type":"text",
          "content":"歡迎光臨OO韓式料理，近期推出眾多優惠活動，歡迎參考看看"
      },
      {
          "type":"carousel",
          "content":[
            {
                "url":"https://pic.pimg.tw/planmarketing/1388115928-2137342601_n.jpg",
                "buttons":[
                  {
                      "text":"優惠訊息",
                      "edgeTo":" "
                  }
                ]
            },
            {
                "url":"https://twdmkingdesign.files.wordpress.com/2013/07/e5ae87e7bf94-out.jpg",
                "buttons":[
                  {
                      "text":"優惠訊息",
                      "edgeTo":" "
                  }
                ]
            },
            {
                "url":"https://pic.pimg.tw/planmarketing/1388117431-866814859_n.jpg",
                "buttons":[
                  {
                      "text":"菜單",
                      "edgeTo":"node_1"
                  }
                ]
            }
          ]
      }
    ]
},
{
    "id":"node_1",
    "type":"node",
    "position":{
      "x":300,
      "y":25
    },
    "title":"State 2",
    "sections":[
      {
          "type":"image",
          "url":"https://1.bp.blogspot.com/-2Dw_xTkV_ZI/XYnbwy5HffI/AAAAAAAAXH0/I8l8_ItCSegZMLAYgeIzeP7lEFMJYQw1wCLcBGAsYHQ/s1600/collage454.jpg"
      },
      {
          "type":"carousel",
          "content":[
            {
                "url":"https://gwan.tw/wp-content/uploads/20190811135312_63.jpg",
                "buttons":[
                  {
                      "text":"銅盤烤肉",
                      "edgeTo":"node_2"
                  }
                ]
            },
            {
                "url":"https://maruko.tw/wp-content/uploads/flickr/50464841108_8754dbd016_b.jpg",
                "buttons":[
                  {
                      "text":"鍋類",
                      "edgeTo":"node_2"
                  }
                ]
            },
            {
                "url":"https://truth.bahamut.com.tw/s01/202109/5fcee5774efbbfb7b27e46d2ccfb3de3.JPG",
                "buttons":[
                  {
                      "text":"拌飯類",
                      "edgeTo":"node_2"
                  }
                ]
            }
          ]
      }
    ]
},
{
    "id":"node_2",
    "type":"node",
    "position":{
      "x": 500,
      "y": 25
    },
    "title":"State 3",
    "sections":[
      {
          "type":"carousel",
          "content":[
            {
                "url":"https://gwan.tw/wp-content/uploads/20190811135312_63.jpg",
                "buttons":[
                  {
                      "text":"海鮮泡菜鍋",
                      "edgeTo":"node_3"
                  }
                ]
            },
            {
                "url":"https://maruko.tw/wp-content/uploads/flickr/50464841108_8754dbd016_b.jpg",
                "buttons":[
                  {
                      "text":"海鮮豆腐鍋",
                      "edgeTo":"node_3"
                  }
                ]
            },
            {
                "url":"https://truth.bahamut.com.tw/s01/202109/5fcee5774efbbfb7b27e46d2ccfb3de3.JPG",
                "buttons":[
                  {
                      "text":"豬肉泡菜鍋",
                      "edgeTo":"node_3"
                  }
                ]
            },
            {
                "url":"https://truth.bahamut.com.tw/s01/202109/5fcee5774efbbfb7b27e46d2ccfb3de3.JPG",
                "buttons":[
                  {
                      "text":"豬肉豆腐鍋",
                      "edgeTo":"node_3"
                  }
                ]
            },
            {
                "url":"https://truth.bahamut.com.tw/s01/202109/5fcee5774efbbfb7b27e46d2ccfb3de3.JPG",
                "buttons":[
                  {
                      "text":"牛肉泡菜鍋",
                      "edgeTo":"node_3"
                  }
                ]
            },
            {
                "url":"https://truth.bahamut.com.tw/s01/202109/5fcee5774efbbfb7b27e46d2ccfb3de3.JPG",
                "buttons":[
                  {
                      "text":"牛肉泡菜鍋",
                      "edgeTo":"node_3"
                  }
                ]
            }
          ]
      }
    ]
},
{
    "id":"node_3",
    "type":"node",
    "position":{
      "x": 700,
      "y": 25
    },
    "title":"State 4",
    "sections":[
      {
          "type":"text",
          "content":"請選擇付款方式",
          "buttons":[
            {
                "text":"line pay",
                "edgeTo":"node_4"
            },
            {
                "text":"其他數位支付",
                "edgeTo":"node_4"
            },
            {
                "text":"信用卡",
                "edgeTo":"node_4"
            },
            {
                "text":"現金",
                "edgeTo":"node_4"
            }
          ]
      }
    ]
},
{
    "id":"node_4",
    "type":"node",
    "position":{
      "x": 900,
      "y": 250
    },
    "title":"State 5",
    "sections":[
      {
          "type":"text",
          "content":"謝謝惠顧"
      }
    ]
  }
];

export default state;
