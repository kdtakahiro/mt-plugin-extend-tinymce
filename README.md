# Extend TinyMCE with common template

Load the table plugin, template plugin and add buttons to TinyMCE that is default rich text editor of Movable Type 6.3.2 or later.

![Screenshot](https://raw.github.com/kdtakahiro/mt-plugin-extend-tinymce-with-common-template/master/artwork/screenshot.png)


## Requirements

* Movable Type 6.3.2 or later

I tested only on 6.3.2.


## Installation

1. Make new MT plugin directory.

like this:

    $MT_HOME/
        plugins/
            TinyMCE
            MultiBlog
            ...other default plugins
        <your-any-plugins-dir-name>/ <- create this.

2. Add your any `PluginPath` to mt-config.cgi.
```
PluginPath plugins <- TinyMCE is in this.
PluginPath <your-any-plugins-dir-name>
```
It must be set the new plugins directory after the directory TinyMCE-plugin is in.

3. Unpack the `ExtendTinyMCEWithCommonTemplate` archive.
4. Upload the contents to the new MT plugins directory.

Should look like this when installed:

    $MT_HOME/
        <your-any-plugins-dir-name>/
            ExtendTinyMCEWithCommonTemplate/
        mt-static/
            plugins/
                ExtendTinyMCEWithCommonTemplate/
            

## License

This library is free software released under the MIT.
 
 
## Copyright

The following copyright notice applies to all the files provided in this
distribution, including binary files, unless explicitly noted otherwise.

* Copyright 2012 Six Apart, Ltd.
* Copyright 2015 Hideki Abe <http://www.anothersky.pw>
* Copyright 2017 Takahiro Kudo
