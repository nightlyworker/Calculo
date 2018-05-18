import markDownComponent from '@/static/content'
export default{
	name:'app',
	components:markDownComponent,
	data(){
		return{
			form:{
				sitetype:"Standard",
				designChoices:"Template",
				speed:"Around 1 to 2 months",
				pages:1,
				copywriting:"No",
				features:[],
				eCommerceFeatures:[],
				customFeatures:[],
				configuration:false
			},
			options:{
				sitetype:[
					{text:"Standard",         price:{low:500, high:800}},
					{text:"E-Commerce",       price:{low:1500,high:3000}},
					{text:"Custom Production",price:{low:4000,high:6000}}
				],
				designChoices:[
					{text:"Template",     price:{low:200, high:500}},
					{text:"Custom Design",price:{low:1000,high:2000}}
				],
				speed:[
					{text:"Less than 1 month",   price:{low:1500,high:2500}},
					{text:"Around 1 to 2 months",price:{low:500, high:1000}},
					{text:"More than 2 months",  price:{low:300, high:500}}
				],
				features:[
					{id:"seo",         price:{low:250,high:500}, text:"Search Engine Optimisation (SEO)"},
					{id:"smo",         price:{low:350,high:700}, text:"Social Media Optimisation (SMO)"},
					{id:"security",    price:{low:450,high:900}, text:"Security Setup"},
					{id:"caching",     price:{low:400,high:800}, text:"Caching & Compression Setup"},
					{id:"cdn",         price:{low:150,high:300}, text:"Content Delivery Network (CDN) Setup"},
					{id:"server",      price:{low:300,high:600}, text:"Server/Webhost Setup"},
					{id:"mail",        price:{low:150,high:200}, text:"Mail Setup"},
					{id:"gallery",     price:{low:100,high:300}, text:"Image/Sliders Gallery"},
					{id:"pagebuilder", price:{low:200,high:400}, text:"PageBuilder Intergration"},
					{id:"contactform", price:{low:100,high:300}, text:"Contact Form"},
					{id:"multilingual",price:{low:500,high:1000},text:"Multilingual Intergration"},
					{id:"backup",      price:{low:250,high:500}, text:"Offsite Backup Intergration"}
				],
				eCommerceFeatures:[
					{id:"pgw",         price:{low:300,high:600}, text:"Payment Gateway Intergration"},
					{id:"social",      price:{low:400,high:800}, text:"Social Login Intergration"},
					{id:"livesearch",  price:{low:300,high:600}, text:"Live Search Intergration"},
					{id:"livechat",    price:{low:600,high:1200},text:"Live Chat Intergration"},
					{id:"catalog",     price:{low:500,high:1000},text:"Catalog Mode"},
					{id:"pos",         price:{low:800,high:2500},text:"Point Of Sale (POS)"},
				],
				customFeatures:[
					{id:"crm",          price:{low:1500,high:3500}, text:"Customer Relationship Management (CRM)"},
					{id:"invoice",      price:{low:1000,high:3000}, text:"Invoicing and Accounting Intergration"},
					{id:"mailMarketing",price:{low:2000,high:4000}, text:"Email Marketing Intergration"},
					{id:"helpdesk",     price:{low:2500,high:5000}, text:"Helpdesk Intergration"},
				],
			}
		}
	},
	methods:{
		activateClass:function(vm){
			/*console.log(markDownComponent);*/
		},
		//Keep the accordion from closing on double toggle
		alwaysOpen:function(){
			for(var i in this.$refs){
				if(true == this.$refs[i].status){
					this.$refs[i].close();
				}
			}
		},
		calcPrice(isMin){
		//Calculate CopyWriting
			var copywriting = this.form.copywriting == "Yes" ? (isMin ? 2.5 : 2) : 1;
			//Calculate Features
				var otherPrice = 0;
				for(var option in this.options){
					if("features" == option || "eCommerceFeatures" == option || "customFeatures" == option){
						var featuresPrice = this.form[option].reduce((total,current)=>{
							var optionFeatures = this.options[option].filter(featureCheck => featureCheck.text == current);
							optionFeatures.forEach(check=>{otherPrice += isMin ? check.price.low : check.price.high;});
							return otherPrice;
						},0);
					}else{
					//Calculate Options
						for(var index in this.options[option]){
						var getOption = this.options[option][index];
							if(getOption.text == this.form[option]){
								otherPrice += isMin ? getOption.price.low : getOption.price.high;
							}
						}
					}
				};
				//Calculate The Total Price + Pages
				var price = otherPrice + ((this.form.pages * (isMin ? 50 : 100)) * copywriting);
				return price;
		}
	},
	computed:{
		//Calculate Mimimum Price
		calcMin(){return this.calcPrice(true);},
		//Calculate Maximum Price
		calcMax(){return this.calcPrice(false);}
	}
}