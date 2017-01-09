(function ($) {

var config   = MT.Editor.TinyMCE.config;
var base_url = StaticURI + 'plugins/ExtendTinyMCEWithCommonTemplate/';

// TinyMCEで利用するプラグイン
// http://www.tinymce.com/wiki.php/Configuration3x:plugins
var add_plugins = ',table,template';

// ボタン - 1段目
// http://www.tinymce.com/wiki.php/Configuration3x:theme_advanced_buttons_1_n
var buttons1 = (config.plugin_mt_wysiwyg_buttons1 || '') + ',|,template,|,attribs,|,charmap';

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

// 定型文（テンプレート）
// template_external_list_urlを設定すると、それが優先されるためMTで登録した定型文が表示されない。
// 設定済みの値に追加してMTで登録した設定も表示する。
if (config.template_templates) {
    for (var i = 0; i < tinyMCETemplateList.length; i++) {
        config.template_templates.push({
            title: tinyMCETemplateList[i][0],
            src: tinyMCETemplateList[i][1],
            description: (3 <= tinyMCETemplateList[i].length) ? tinyMCETemplateList[i][2] : ""
        });
    }
}

var convert_urls = true;
var remove_script_host = true;
var relative_urls = false;
var element_format = 'html';
var schema = "html5";

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
    convert_urls: convert_urls,
    remove_script_host: remove_script_host,
    relative_urls: relative_urls,
    element_format: element_format,
    end_container_on_empty_block: true,    // End container block element when pressing enter inside an empty block
    schema: schema
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

}(jQuery));
