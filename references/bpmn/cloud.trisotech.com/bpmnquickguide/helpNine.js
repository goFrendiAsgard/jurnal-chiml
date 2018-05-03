(function($){
    "use strict";

    var APIKEY = '292003f69840e712';

    var updateSolutions = function() {
        var products = [];
        $.ajax({
            url: '/publicapi/navigation',
            dataType: 'xml',
            data : {
                mode : 'xml',
                apikey : APIKEY
            },
            xhrFields: {
                'withCredentials': true
            },
            success: function(data) {
                var $solutions = $(data).find('LinkElement[id|=solution]');
                $solutions.each(function() {
                    products.push({
                        id: $(this).attr('id'),
                        url: $(this).attr('url'),
                        name: $(this).attr('name'),
                        imageUrl: $(this).attr('iconURL')
                    });
                });
                var userInfo = JSON.parse(sessionStorage.trisoUserInfo);
                userInfo.products = products;
                sessionStorage.trisoUserInfo = JSON.stringify(userInfo);
                createSolutionMenu();
            },
            error: function(data) {

            }
        });
    };

    var getProductDefinition = function(id) {
        var products = JSON.parse(sessionStorage.trisoUserInfo).products;
        for (var i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                return products[i];
            }
        }
        return {};
    };

    function createSolutionMenu() {
        var res = JSON.parse(sessionStorage.trisoUserInfo).products;
        if (res.length >= 1) {
            var $solutionsDrop = $('#solutions-menu').empty();
            for (var j = 0; j < res.length; j++) {
                var solution = getProductDefinition(res[j].id);
                var $solution = $('<li class="solution" data-id="' + solution.id +'" title="' + solution.name + '"></li>').appendTo($solutionsDrop);
                $('<img src="' + solution.imageUrl + '" class="img-responsive" alt="' + solution.name + '">').appendTo($solution);
            }
            $solutionsDrop.find('.solution').click(function() {
                var product = getProductDefinition($(this).data("id"));
                if (product) {
                    window.open(product.url);
                }
            });
            $('#solutions-menu').hide();
            $('#solutions-button').addClass('show-pointer').on('click', toggleSolution);
        } else {
            $('#solutions-button').removeClass('show-pointer').off('click', toggleSolution);
        }
    }

    function toggleSolution() {
        $('#solutions-menu').toggle();
    }

    $(document).ready(function() {

        var removeSolutions = function() {
            $('#solutions-menu').hide();
            var button = $('#solutions-button');
            button.removeClass('show-pointer').off('click', toggleSolution);
            button.siblings('.divider').remove();
            button.remove();
        };

        $('.dropdown-menu input, .dropdown-menu label').click(function(e) {
            e.stopPropagation();
        });
        $('#solutions-menu').hide();
        $('#solutions-menu').mouseleave(function() {
            $(this).hide();
        });

        $.ajax({
            type: "GET",
            url: '/publicapi/login',
            dataType: "json",
            data : {
                mode : 'json',
                apikey : APIKEY
            },
            xhrFields: {
                'withCredentials': true
            }
        }).success(function(data) {
            if (data.data.authToken) {
                sessionStorage.trisoUserInfo = JSON.stringify({
                    name: data.data.name
                });
                updateSolutions();
            } else {
                removeSolutions();
            }
        }).fail(function(){
            removeSolutions();
        });
    });

})(jQuery);
