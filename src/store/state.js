const state = [
  {
    id: "node_0",
    type: "node",
    position: { x: 250, y: 25 },
    title: "State 1",
    sections: [
      {
        type: "img",
        url: "https://media-exp1.licdn.com/dms/image/C561BAQGZqA8gJ2Edpg/company-background_10000/0/1614011974707?e=2159024400&v=beta&t=LMVAHLMDb9k1bPnUbhAfgDAbbwCagwvNnahVrvS7vkg"
      },
      {
        type: "text",
        content: "Zuma award-winning Japanese restaurants have led the way for more than 18 years with their sophisticated twist on ‘izakaya’-style informal dining: a contemporary take on authentic Japanese cuisine which is innovative, while still rooted in traditional methods.",
        buttons: [
          {
            text: "Location",
            edgeTo: "node_1"
          },
          {
            text: "About us",
            edgeTo: "node_2"
          }
        ]
      },
      {
        type: "carousel",
        content: [
          {
            url: "https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-9/247422907_4271492296309787_6334814990393885414_n.png?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=o7iYjM3_EpgAX-vehym&_nc_ht=scontent.fkhh1-1.fna&oh=ecfccbe9eb238b700cdae4079398cfa2&oe=61987509",
            buttons: [
              {
                text: "test",
                edgeTo: "node_3"
              }
            ]
          },
          {
            url: "https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-9/245630095_4271492292976454_4327254763463996235_n.png?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=r164aZkgH5YAX9-aAvT&_nc_ht=scontent.fkhh1-1.fna&oh=94a7aeaa85d88df740bbb472cc5a39c8&oe=61984AE8",
            buttons: [
              {
                text: "test",
                edgeTo: "node_4"
              }
            ]
          }
        ]
      }
    ]
  }
];

export default state;
