// 生命之树：N(名称, 分化时间[百万年前], 子类群...)；L(名称, 配色类群, 插图, 灭绝时间)
var TREE=(function(){
const N=(n,t,...c)=>({n,t,c}), L=(n,l,a,e)=>({n,l,a,e});
const dino   = N('恐龙',165, L('非鸟恐龙','dino','trex',66), L('鸟类','bird','survivor'));
const ornith = N('鸟颈类',240, L('翼龙','rept','eudimorphodon',66), dino);
const archo  = N('初龙类',245, L('鳄类','rept','protosuchus'), ornith);
const archel = N('主龙形类',255, L('龟鳖','rept','odontochelys'), archo);
const saur   = N('蜥形类',280, L('蜥蜴与蛇','rept','snake'), archel);
const amnio  = N('羊膜动物',318, L('哺乳类','mamm','mammoth'), saur);
const tetra  = N('四足动物',350, L('两栖类','amph','frog'), amnio);
const sarco  = N('肉鳍鱼类',410, L('腔棘鱼、肺鱼','fish','coelacanth'), tetra);
const osteo  = N('硬骨鱼',420, L('辐鳍鱼','fish','teleost'), sarco);
const gnath  = N('有颌脊椎动物',430, L('软骨鱼（鲨鱼）','fish','shark'), osteo);
const verts  = N('脊椎动物',470, L('无颌鱼','fish','myllokunmingia'), gnath);
const deut   = N('后口动物',560, L('棘皮动物（海星）','inv'), verts);
const arthro = N('节肢动物',530, L('三叶虫','inv','trilobite',252), L('昆虫、蜘蛛、虾蟹','arth','beetle'));
const prot   = N('原口动物',560, L('软体动物','inv','ammonite'), arthro);
const bilat  = N('两侧对称动物',580, prot, deut);
const eumet  = N('真后生动物',650, L('刺胞动物（珊瑚、水母）','inv','coral'), bilat);
const anim   = N('动物',750, L('海绵','inv'), eumet);
const opis   = N('真菌与动物',1100, L('真菌','fungi','amber_mushroom'), anim);
const seedp  = N('种子植物',330, L('裸子植物','plant','gymno'), L('被子植物','plant','angio'));
const vasc   = N('维管植物',430, L('蕨类与石松','plant','lepido'), seedp);
const land   = N('陆地植物',500, L('苔藓植物','plant','moss'), vasc);
const plants = N('植物',1000, L('绿藻','plant','greenalga'), land);
const euk    = N('真核生物',1800, plants, opis);
const arcEuk = N('古菌与真核生物',3500, L('古菌','earth'), euk);
return N('所有生命的共同祖先',3800, L('细菌','earth'), arcEuk);
})();
