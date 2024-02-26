// config.js per DEV
export const API_GETIMGS_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/getAllImgsFromCloud.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/getAllImgsFromCloud.php';
export const API_GETSTRATS_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/getStrats.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/getStrats.php';
export const API_GETMAPS_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/getMaps.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/getMaps.php';
export const API_DELETEIMG_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/deleteImgFromCloud.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/deleteImgFromCloud.php';
export const API_DELETERAVEN_URL =
    (process.env.NODE_ENV === 'production') ?
        'https://www.francescopieraccini.it/my_site/admin/c-panel/apis/deleteRaven.php' :
        'http://francescopieraccini.localhost/admin/c-panel/apis/deleteRaven.php';
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
export const API_INSERT_STRAT_XFOW_URL =
    (process.env.NODE_ENV === 'production') ?
        "https://www.francescopieraccini.it/my_site/admin/c-panel/apis/insertStratXfow.php" :
        "http://francescopieraccini.localhost/admin/c-panel/apis/insertStratXfow.php";
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
