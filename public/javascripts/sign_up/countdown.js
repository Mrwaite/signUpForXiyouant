// Create Countdown



var Countdown = {

    // Backbone-like structure
    $el: $('.countdown'),

    // Params
    countdown_interval: null,
    total_seconds: 0,

    // Initialize the countdown
    init: function(DeadLineSet) {
        var Today = new Date();

        var DeadLine = new Date(DeadLineSet);

        var diff_ms_seconds = DeadLine.getTime() - Today.getTime();//相差的毫秒数

        var diff_day = Math.floor((diff_ms_seconds)/(24*3600*1000));//相差的天数

        var leave1 = diff_ms_seconds % (24*3600*1000);//计算天数之后的毫秒数
        var diff_hours = Math.floor(leave1 / (3600*1000));//相差的小时数

        var leave2 = leave1%(3600*1000);//计算小时数之后的毫秒数
        var diff_min = Math.floor(leave2/(60*1000));//相差的分数

        var leave3 = leave2%(60*1000);//计算分数之后的毫秒数
        var diff_seconds = Math.round(leave3/1000);//相差的秒数

        // DOM
        this.$ = {
            days: this.$el.find('.bloc-time.days .figure'),
            hours: this.$el.find('.bloc-time.hours .figure'),
           minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
        };

        // Init countdown values
        this.values = {
            days: diff_day,
            hours: diff_hours,
            minutes: diff_min,
            seconds: diff_seconds
        };

        // Initialize total seconds
        // this.total_seconds = ((this.values.days * 24) + (this.values.hours * 60 * 60 + (this.values.minutes * 60))) + this.values.seconds;
        this.total_seconds = (DeadLine.getTime() - Today.getTime())/(1000);
        console.log(Today);
        // Animate countdown to the end
        this.count();
    },

    count: function() {

        var that = this,
            $day_1 = this.$.days.eq(0),
            $day_2 = this.$.days.eq(1),
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1 = this.$.minutes.eq(0),
            $min_2 = this.$.minutes.eq(1),
            $sec_1 = this.$.seconds.eq(0),
            $sec_2 = this.$.seconds.eq(1);

        that.checkDay(that.values.days, $day_1, $day_2);
        that.checkDay(that.values.hours, $hour_1, $hour_2);
        that.checkDay(that.values.minutes, $min_1, $min_2);
        that.checkDay(that.values.seconds, $sec_1, $sec_2);

        this.countdown_interval = setInterval(function() {

            if (that.total_seconds >= 0) {

                // Update DOM values
                // Days
                that.checkDay(that.values.days, $day_1, $day_2);


                // Hours
                that.checkDay(that.values.hours, $hour_1, $hour_2);

                // Minutes
                that.checkDay(that.values.minutes, $min_1, $min_2);

                // Seconds
                that.checkDay(that.values.seconds, $sec_1, $sec_2);

                //开始计算下一秒的情况
                if (that.values.seconds > 0) {
                    --that.values.seconds;
                } else if (that.values.minutes > 0) {
                    --that.values.minutes;
                    that.values.seconds = 59;
                } else if (that.values.hours > 0) {
                    --that.values.hours;
                    that.values.minutes = 59;
                    that.values.seconds = 59;
                } else if (that.values.days > 0) {
                    --that.values.days;
                    that.values.hours = 23;
                    that.values.minutes = 59;
                    that.values.seconds = 59;
                }

                --that.total_seconds;
            } // end if(that.total_seconds > 0)
            else {
                clearInterval(that.countdown_interval);
                $('.countdown').hide();
                var inter_html = $("<div class='ui inverted se . gment'style='text-align: center;'> <a class='ui inverted red button' href='../form' target='_self'>立即报名</a></div>");
                $('.wrap').append(inter_html);
            }
        }, 1000);
    },

    animateFigure: function($el, value) {

        var that = this,
            $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');

        // Before we begin, change the back value
        $back_top.find('span').html(value);

        // Also change the back bottom value
        $back_bottom.find('span').html(value);

        // Then animate
        TweenMax.to($top, 0.8, {
            rotationX: '-180deg',
            transformPerspective: 300,
            ease: Quart.easeOut,
            onComplete: function() {

                $top.html(value);

                $bottom.html(value);

                TweenMax.set($top, {
                    rotationX: 0
                });
            }
        });

        TweenMax.to($back_top, 0.8, {
            rotationX: 0,
            transformPerspective: 300,
            ease: Quart.easeOut,
            clearProps: 'all'
        });
    },

    checkDay: function(value, $el_1, $el_2) {

        var val_1 = value.toString().charAt(0),
            val_2 = value.toString().charAt(1),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html();

        if (value >= 10) {

            // Animate only if the figure has changed
            if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        } else if (value > 0 ) {

            // If we are under 10, replace first figure with 0
            if (fig_1_value !== '0') this.animateFigure($el_1, 0);
            if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        } else {
            if (fig_1_value !== '0') this.animateFigure($el_1, 0);
            if (fig_2_value !== '0') this.animateFigure($el_2, 0);
        }
    }
};


// Let's go !
Countdown.init('Nov 3, 2017 19:30');
