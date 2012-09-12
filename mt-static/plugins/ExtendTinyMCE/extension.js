(function($) {

var config   = MT.Editor.TinyMCE.config,
    base_url = StaticURI + 'plugins/ExtendTinyMCE/',
    add_plugins = ',table,template',
    buttons1 = (config.plugin_mt_wysiwyg_buttons1 || '') + ',|,template',
    buttons2 = 'undo,redo,|,forecolor,backcolor,removeformat,|,justifyleft,justifycenter,justifyright,indent,outdent,|,styleselect,formatselect,fontsizeselect,|,mt_fullscreen',
    buttons3 = (config.plugin_mt_wysiwyg_buttons3 || '') + ',tablecontrols,|,visualaid',
    indent_before = 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,dl,dt,dd,area,table,thead,tfoot,tbody,tr,iframe,section,article,hgroup,aside,figure,option,optgroup,datalist',
    indent_after = 'p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,ul,ol,dl,dt,dd,area,table,thead,tfoot,tbody,tr,iframe,section,article,hgroup,aside,figure,option,optgroup,datalist',
    styles = [
        {title : 'Example 1', inline : 'span', classes : 'example1'},
        {title : 'Example 2', inline : 'span', classes : 'example2'}
    ],
    font_sizes = '12px,16px',
    template_external_list_url = 'tmpl/template_list.js',
    content_css = 'css/module.css',
    convert_urls = true,
    remove_script_host = true,
    relative_urls = false,
    element_format = 'html';

$.extend(config, {
    plugins: config.plugins + add_plugins,
    plugin_mt_wysiwyg_buttons1: buttons1,
    plugin_mt_wysiwyg_buttons2: buttons2,
    plugin_mt_wysiwyg_buttons3: buttons3,
    indent_before: indent_before,
    indent_after: indent_after,
    style_formats: styles,
    theme_advanced_font_sizes: font_sizes,
    template_external_list_url: base_url + template_external_list_url,
    content_css: base_url + content_css,
    convert_urls: convert_urls,
    remove_script_host: remove_script_host,
    relative_urls: relative_urls,
    element_format: element_format
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

})(jQuery);
