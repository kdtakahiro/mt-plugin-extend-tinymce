(function ($) {
var blogId;
var magicToken;
var authDfd = $.Deferred();
var api;
var $overlay;
var loadingImgSrc = StaticURI + "images/loadingAnimation.gif";
var $loadingImg = $("<img src='" + loadingImgSrc + "' alt='読み込み中' style='position: absolute; top: 25%; left: 50%; margin-left: -104px;'>");

var config   = MT.Editor.TinyMCE.config;
var base_url = StaticURI + 'plugins/ExtendTinyMCE/';

// TinyMCEで利用するプラグイン
// http://www.tinymce.com/wiki.php/Configuration3x:plugins
var add_plugins = ',table,template';

// ボタン - 1段目
// http://www.tinymce.com/wiki.php/Configuration3x:theme_advanced_buttons_1_n
var buttons1 = (config.plugin_mt_wysiwyg_buttons1 || '') + ',|,template,|,attribs';

// ボタン - 2段目
var buttons2 = 'undo,redo,|,forecolor,backcolor,removeformat,|,justifyleft,justifycenter,justifyright,indent,outdent,|,styleselect,formatselect,fontsizeselect,|,mt_fullscreen';

// ボタン - 3段目
var buttons3 = (config.plugin_mt_wysiwyg_buttons3 || '') + ',tablecontrols,|,visualaid';

var indent_before = 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,dl,dt,dd,area,table,thead,tfoot,tbody,tr,iframe,section,article,aside,figure,option,optgroup,datalist';
var indent_after = 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,dl,dt,dd,area,table,thead,tfoot,tbody,tr,iframe,section,article,aside,figure,option,optgroup,datalist';

// スタイルプルダウンの定義
// 任意のstyle属性値やclass属性値を付与した要素が挿入可能になる
// http://www.tinymce.com/wiki.php/Configuration3x:style_formats
var styles = [
        { title: 'セクション', block: 'section', wrapper: true, merge_siblings: false },
        { title: '画像ブロック', block: 'div', wrapper: true, merge_siblings: false, classes: 'clearfix' }
    ];

// フォントサイズプルダウンの定義
// カンマ区切りで指定
// http://www.tinymce.com/wiki.php/Configuration3x:theme_advanced_font_sizes
var font_sizes = '12px,16px';

// 書式プルダウンの定義
// カンマ区切りで要素を指定
// http://www.tinymce.com/wiki.php/Configuration3x:theme_advanced_blockformats
var theme_advanced_blockformats = 'p,h2,h3,h4,h5';

// テンプレートリストへのパス
// 記事の定型文を設定した場合、記事編集画面では定型文がリストアップされます。
// （テンプレートの設定内容は表示されません。）
var template_external_list_url = 'tmpl/template_list.js?' + Math.ceil(Math.random() * 1000000000);

var convert_urls = true;
var remove_script_host = true;
var relative_urls = false;
var element_format = 'html';
var schema = "html5";

// アセットアップロードダイアログのオープン
function openDialog(mode, param) {
    createSessionHistoryFallback(location.href);
    $.fn.mtDialog.open(
        ScriptURI + '?' + '__mode=' + mode + '&amp;' + param
    );
}

function getEditorBody(elem) {
    var body;
    var getParent = function (elem) {
        var parent;

        parent = elem.parentNode;

        if (parent.tagName.toLowerCase() !== "body") {
            parent = getParent(parent);
        }

        return parent;
    };

    if (elem.tagName.toLowerCase() === "html") {
        body = elem.getElementsByTagName("body")[0];
    } else {
        body = getParent(elem);
    }

    return body;
}

$.extend(config, {
    plugins: config.plugins + add_plugins,
    plugin_mt_wysiwyg_buttons1: buttons1,
    plugin_mt_wysiwyg_buttons2: buttons2,
    plugin_mt_wysiwyg_buttons3: buttons3,
    indent_before: indent_before,
    indent_after: indent_after,
    style_formats: styles,
    theme_advanced_font_sizes: font_sizes,
    theme_advanced_blockformats: theme_advanced_blockformats,
    template_external_list_url: base_url + template_external_list_url,
    convert_urls: convert_urls,
    remove_script_host: remove_script_host,
    relative_urls: relative_urls,
    element_format: element_format,
    end_container_on_empty_block: true,    // End container block element when pressing enter inside an empty block
    schema: schema,
    setup: function (editor) {
        editor.onInit.add(function() {
            var event = document.createEvent("CustomEvent");

            editor.dom.bind(editor.getWin(), ["drop"], function (e) {
                var id;
                var data;

                if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!api) {
                        alert("画像・ファイルは、「画像の挿入」「アイテムの挿入」ボタンを使って配置して下さい。");
                        return;
                    } else if (e.dataTransfer.files[0].type.indexOf("image") === -1) {
                        alert("ファイルは「アイテムの挿入」ボタンを使って配置して下さい。");
                        return;
                    }

                    event.initCustomEvent("apiloading", true, true, null);
                    window.parent.dispatchEvent(event);

                    id = getEditorBody(e.target).id;
                    data = {
                        file: e.dataTransfer.files[0],
                        path: "images/",
                        autoRenameIfExists: true,
                        normalizeOrientation: true
                    };

                    api.uploadAsset({ site_id: blogId }, data, function (response) {
                        var url;

                        event.initCustomEvent("apiloaded", true, true, null);
                        window.parent.dispatchEvent(event);

                        if (response.error) {
                            console.log(response.error);
                            alert("画像が正常にアップロードできませんでした。");
                            return
                        }

                        openDialog(
                            "complete_insert",
                            "magic_token=" + magicToken + "&id=" + response.id +
                            "&_type=asset&edit_field=" + id + "&blog_id=" + blogId +
                            "&dialog_view=1&filter=class&filter_val=image&entry_insert=1&" +
                            "direct_asset_insert=1&no_insert=0"
                        );
                    });
                }
            });
        });
    },
});

$.extend(config.plugin_mt_inlinepopups_window_sizes, {
    'table/table.htm': {
        width: 600,
        height: 300
    },
    'table/row.htm': {
        width: 450,
        height: 300
    },
    'table/cell.htm': {
        width: 450,
        height: 300
    },
    'table/merge_cells.htm': {
        width: 250,
        height: 140
    }
});

// Data APIインスタンス作成・認証
api = new MT.DataAPI({
    clientId: "extendtinymce",
    baseUrl: "/mt/mt-data-api.cgi",
    format: "json"
});

api.authenticate({
    username: extendTinyMCESettings.apiUsername,
    password: extendTinyMCESettings.apiPassword,
    remember: true
}, function (response) {
    if (response.error) {
        authDfd.reject();
    }

    api.storeTokenData(response);
    authDfd.resolve();
});

authDfd.fail(function () {
    console.log("[Movable Type Data API] 認証に失敗しました。");
    api = null;
});

// 編集画面データ取得
$(function () {
    blogId = $("#blog-id").val() || 0;
    magicToken = $("input[name='magic_token']").val();

    $(window).on("apiloading", function () {
        $(".mt-dialog-overlay").append($loadingImg).show();
    });

    $(window).on("apiloaded", function () {
        $(".mt-dialog-overlay").hide().empty();
    });
});
}(jQuery));
