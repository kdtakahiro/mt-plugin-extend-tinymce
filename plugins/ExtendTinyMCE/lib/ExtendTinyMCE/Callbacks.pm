package ExtendTinyMCE::Callbacks;
use strict;

sub embed_setting {
    my ($cb, $app, $tmpl_str_ref, $param, $tmpl) = @_;

    my $plugin = MT->component('ExtendTinyMCE');
    my $data_api_username = $plugin->get_config_value('data_api_username', 'system') || '';
    my $data_api_password = $plugin->get_config_value('data_api_password', 'system') || '';
    my $option_data = <<__HTML__;
<script>
var extendTinyMCESettings = {
    apiUsername: "${data_api_username}",
    apiPassword: "${data_api_password}"
};
</script>
__HTML__

    $$tmpl_str_ref =~ s!<\!\-\- ExtendTinyMCESetting \-\->!$option_data!;
}

1;
