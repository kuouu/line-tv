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
            edgeTo: ""
          },
          {
            text: "About us",
            edgeTo: ""
          }
        ]
      },
      // {
      //   type: "carousel",
      //   content: [
      //     {
      //       url: "https://...",
      //       buttons: [
      //         {
      //           text: "test",
      //           edgeTo: "node_3"
      //         }
      //       ]
      //     },
      //     {
      //       url: "https://...",
      //       buttons: [
      //         {
      //           text: "test",
      //           edgeTo: "node_4"
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }
];

export default state;
