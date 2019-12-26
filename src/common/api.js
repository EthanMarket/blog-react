import ajax from './axiosConfig'
//首页文章列表
export const reqArticleList = (data) => ajax('/getArticleList', data, 'GET')
//首页文章目录
export const reqArticleDirectory = (data) => ajax('/getArticleDirectory', data, 'GET')
//info标签
export const reqTagList = (data) => ajax('/getTagList', data, 'GET')
//info分类
export const reqCategoryList = (data) => ajax('/getCategoryList', data, 'GET')
//info友情链接
export const reqFriendLinkList = (data) => ajax('/getLinkList', data, 'GET')
//归档
export const reqTimeAxisList = (data) => ajax('/getTimeAxisList', data, 'GET')
/*-------文章详情-----start-----*/
export const reqArticleDetail = (data) => ajax('/getArticleDetail', data, 'POST')
//喜欢文章
export const reqLikeArticle = (data) => ajax('/likeArticle', data, 'POST')
export const reqAddComment = (data) => ajax('/addComment', data, 'POST')
export const reqAddSecondComment = (data) => ajax('/addSecondComment', data, 'POST')
/*-------文章详情----end------*/
/*-------项目-----start-----*/
export const reqProjectList = (data) => ajax('/getProjectList', data, 'GET')
/*-------项目-----end-----*/

/*用户登录*/
export const reqLogin = (user) => ajax('/login', user, 'POST')
export const reqRegister = (user) => ajax('/register', user, 'POST')


/*用户登录*/
//保存boss信息
export const updateBossInfo = (user) => ajax('/api/bossinfo', user, 'POST')