define(["underscore", "backbone"], function (_, Backbone) {
    var logger = function (listeners) { this.listeners = this.listeners.concat(listeners || []); };

    var LEVEL = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        FATAL: 5,
    };

    var ConsoleLogger = (function(){
        
        var console = window.console;
        if(!console || (function(){ return !console.warn || !console.info || !console.error; })()) {
            return function(logEntry){ return; }
        } else {
            return function(logEntry){ 
                    
                var func = console.info;
                
                switch(logEntry.level){
                    case LEVEL.INFO:
                        !console.info || (function(){ func = console.log; })();
                    break;
                    case LEVEL.WARN:
                        !console.warn || (function(){ func = console.warn; })();
                    break;
                    case LEVEL.ERROR:
                        !console.error || (function(){ func = console.error; })();
                    break;
                }
                
                var message = logEntry.message.length === 1 && typeof(logEntry.message[0])==='string' ? [[ logEntry.time.toLocaleTimeString(), logEntry.message[0] ].join(' ')] : logEntry.message;
                !!func.apply ? func.apply(console, message) : func(message);
            }
        }

    })();

    logger.prototype = _.extend({
        level: LEVEL,
        data: [],
        listeners: [ ConsoleLogger ],
        log: function(level){
            var _this = this, logEntry = { time: (new Date()), level: level, message: _.rest(arguments) };

            // Propogate to listeners
            _(this.listeners).each(function(listener){
                listener.call(_this, logEntry);
            });
        },
        info: function(){
            this.log.apply(this, [LEVEL.INFO].concat(_.toArray(arguments)));
        },
        warn: function(){
            this.log.apply(this, [LEVEL.WARN].concat(_.toArray(arguments)));
        },
        error: function(){
            this.log.apply(this, [LEVEL.ERROR].concat(_.toArray(arguments)));
        }
    }, Backbone.events);

    return logger;
});