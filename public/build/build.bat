@echo off
@cls
@echo Rendering CSS..
@cscript lessc.wsf ../css/styles.less ../css/styles.css -compress > nul
@echo Building project file..
@node r.js -o name=main-dev out=../js/main.js baseUrl=../js/ paths.order="libs/requirejs/plugins/order" paths.text="libs/requirejs/plugins/text" paths.jquery="libs/jquery/jquery-min" paths.backbone="libs/backbone/backbone" paths.underscore="libs/underscore/underscore" > nul
@REM For CDN retrieval of jquery add 'paths.jquery=empty:' (with the colon)  
echo Done!
