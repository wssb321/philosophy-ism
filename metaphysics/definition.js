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
    q('x01','意识最终可以由物理过程得到完整解释。','material-ideal',-1),q('x02','心灵具有不能完全还原为物质描述的基础性质。','material-ideal',1),q('x03','即使没有观察者，物理世界仍按自身结构存在。','material-ideal',-1),q('x04','我们称为现实的结构在某种程度上依赖意识。','material-ideal',1),q('x05','理解大脑活动原则上足以解释全部心理现象。','material-ideal',-1),q('x06','意义与观念不只是物质过程的附带结果。','material-ideal',1),q('x07','自然科学所描述的实体构成现实的基本层次。','material-ideal',-1),q('x08','经验世界背后可能存在更基础的精神或理念结构。','material-ideal',1),
    q('x09','可靠知识最终需要接受经验观察的检验。','empirical-rational',-1),q('x10','某些重要知识可以主要通过理性推演获得。','empirical-rational',1),q('x11','没有感觉经验，我们很难形成关于世界的实质知识。','empirical-rational',-1),q('x12','清晰且必然的理性原则比变化的经验更可靠。','empirical-rational',1),q('x13','当理论与反复观察冲突时，应优先修正理论。','empirical-rational',-1),q('x14','经验材料只有在先在概念框架中才成为知识。','empirical-rational',1),q('x15','关于事实的主张应能指出可能的观察依据。','empirical-rational',-1),q('x16','数学与逻辑揭示的结构可独立于具体经验成立。','empirical-rational',1),
    q('x17','人在相同条件下仍可能真正选择不同的行动。','free-determined',-1),q('x18','如果完整掌握先前条件和规律，行动原则上可以被确定。','free-determined',1),q('x19','道德责任需要行动者拥有真实的可选择性。','free-determined',-1),q('x20','我们的决定也是性格、环境与生理过程共同造成的结果。','free-determined',1),q('x21','反思能够让人超越部分既有原因的推动。','free-determined',-1),q('x22','选择感本身也可能是因果链中的一种心理现象。','free-determined',1),q('x23','承认影响因素并不意味着选择完全被它们决定。','free-determined',-1),q('x24','每个决定都由当时的整体条件充分塑造。','free-determined',1),
    q('x25','心灵与物质应当能归入同一种基础实在。','mono-dual',-1),q('x26','心理性质与物理性质属于两类不可相互还原的存在。','mono-dual',1),q('x27','统一理论最终应能同时解释意识与世界。','mono-dual',-1),q('x28','主观体验与客观物体之间存在根本类别差异。','mono-dual',1),q('x29','看似不同的存在类型可能只是同一实在的不同表现。','mono-dual',-1),q('x30','即使物理描述完整，它仍可能遗漏第一人称体验。','mono-dual',1),q('x31','增加基础实体种类会提高理论负担，应优先尝试统一解释。','mono-dual',-1),q('x32','承认两种基础层面可能比勉强还原其中一种更合理。','mono-dual',1),
  ],
};

