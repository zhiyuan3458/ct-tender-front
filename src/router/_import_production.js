// module.exports = (path) => () => import(`@/pages/${path}.vue`);
module.exports = path => () => import(`src/pages/${path}.vue`);
