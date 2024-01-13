// config.js per DEV
export const API_GETIMGS_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/getAllImgsFromCloud.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/getAllImgsFromCloud.php';
export const API_DELETEIMG_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/deleteImgFromCloud.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/deleteImgFromCloud.php';
export const API_CHECKLOGGED_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/checkLogged.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/checkLogged.php';
export const IMGS_DIR =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/myCloud/cloudImgs/' :
        'http://francescopieraccini.localhost/myCloud/cloudImgs/';
export const API_INSERTIMG_URL =
    (process.env.NODE_ENV === 'production') ?
        "https://www.francescopieraccini.it/my_site/admin/c-panel/apis/insertImgsInCloud.php" :
        "http://francescopieraccini.localhost/admin/c-panel/apis/insertImgsInCloud.php";
export const CPANEL_URL =
    (process.env.NODE_ENV === 'production') ?
        "https://www.francescopieraccini.it/my_site/admin/c-panel/" :
        "./";
export const API_LOGOUT_URL =
    (process.env.NODE_ENV === 'production') ?
        "https://www.francescopieraccini.it/my_site/admin/c-panel/apis/logout.php" :
        "http://francescopieraccini.localhost/admin/c-panel/apis/logout.php";
export const AMBIENTE =
    (process.env.NODE_ENV === 'production') ?
        "PROD" : "DEV";
