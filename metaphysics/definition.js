const q=(id,text,axis,weight)=>({id,text,effects:{[axis]:weight}});
export const METAPHYSICS_TEST={
  id:'metaphysics',version:1,title:'形而上学与认识论测试',resultMode:'axes',ideologies:[],
  description:'分别观察你对实在、知识、选择和心物关系的倾向。',
  notice:'本站所使用的“形而上学”为西方哲学本义（研究存在、本质、实在的基础哲学学科），并非马克思主义哲学中“孤立、静止、片面的思维方式”定义，二者无关。',
  dimensions:[
    {id:'material-ideal',name:'实在基础',low:'唯物取向',high:'唯心取向',description:'物质过程还是心灵与观念具有更基础的解释地位。'},
    {id:'empirical-rational',name:'知识来源',low:'经验主义',high:'理性主义',description:'经验观察还是理性原则在知识中更具基础作用。'},
    {id:'free-determined',name:'行动因果',low:'自由意志论',high:'决定论',description:'选择的自主性与先前条件的决定作用如何平衡。'},
    {id:'mono-dual',name:'心物结构',low:'一元论',high:'二元论',description:'现实最终是一类基础存在还是两类不可还原存在。'},
  ],
  questions:[
    q('x01','人的意识，最终可以完全用大脑和其他物理过程来解释。','material-ideal',-1),q('x02','人的心灵有一些基本特点，不能完全用物质和大脑来解释。','material-ideal',1),q('x03','就算没有任何人观察，物质世界也会照样存在和运行。','material-ideal',-1),q('x04','我们眼中的现实，在一定程度上取决于人的意识。','material-ideal',1),q('x05','只要彻底弄懂大脑怎样活动，原则上就能解释所有心理现象。','material-ideal',-1),q('x06','意义和想法不只是物质活动顺带产生的东西。','material-ideal',1),q('x07','现实最基本的东西，就是自然科学研究的那些物质存在。','material-ideal',-1),q('x08','我们能看到的世界背后，可能还有更根本的精神或理念。','material-ideal',1),
    q('x09','可靠的知识，最后都应该经得起实际观察。','empirical-rational',-1),q('x10','有些重要知识主要靠逻辑思考就能得到。','empirical-rational',1),q('x11','没有亲身感受和观察，我们很难真正了解世界。','empirical-rational',-1),q('x12','清楚而且一定成立的道理，比会变化的观察结果更可靠。','empirical-rational',1),q('x13','如果理论和反复观察到的事实不一致，就该先改理论。','empirical-rational',-1),q('x14','我们看到的经验，必须经过头脑里已有的概念整理，才能成为知识。','empirical-rational',1),q('x15','关于事实的说法，应该能讲清楚它依据了哪些观察。','empirical-rational',-1),q('x16','数学和逻辑中的规律，即使没有具体经验也可以成立。','empirical-rational',1),
    q('x17','即使所有条件都一样，人仍可能真正做出不同选择。','free-determined',-1),q('x18','如果知道所有过去的条件和规律，原则上就能确定一个人会怎么做。','free-determined',1),q('x19','只有真的可以作出不同选择，一个人才该为行为负责。','free-determined',-1),q('x20','我们的决定，是性格、环境和身体状况共同造成的。','free-determined',1),q('x21','认真反思，可以让人不完全被过去的原因推着走。','free-determined',-1),q('x22','我们觉得“是自己选的”，也可能只是因果过程产生的一种感受。','free-determined',1),q('x23','承认各种因素会影响我们，不等于我们的选择完全由它们决定。','free-determined',-1),q('x24','人在每个时刻做出的决定，都被当时的所有条件决定。','free-determined',1),
    q('x25','心灵和物质，最终应该能用同一种根本东西来解释。','mono-dual',-1),q('x26','心理和物理是两种根本不同、不能互相化成对方的存在。','mono-dual',1),q('x27','一个足够完整的理论，最终应该能一起解释意识和外部世界。','mono-dual',-1),q('x28','内心感受和外部物体，从根本上就是两类不同的东西。','mono-dual',1),q('x29','看起来不同的存在，可能只是同一种东西的不同表现。','mono-dual',-1),q('x30','即使把所有物理过程都说清楚，也可能解释不了一个人的主观感受。','mono-dual',1),q('x31','假设世界有很多种根本存在会让理论更复杂，所以应该先尝试用一种来解释。','mono-dual',-1),q('x32','承认心灵和物质是两种根本存在，可能比硬把一种归到另一种更合理。','mono-dual',1),
  ],
};

