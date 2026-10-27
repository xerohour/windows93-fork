/*! { author: "Bp103", name: "twinkle twinkle (simple)", url: "https://www.reddit.com/r/bytebeat/comments/11sj8fx/twinkle_twinkle_simple/", date: "2023-03-16", mode: "Floatbeat", cover: "[Twinkle Twinkle Little Star](https://youtu.be/yCjJyiqpAuU)" } */
main();
function main(){
	q=t/8000;
	lead = q*55*pow(pow(2,1.0/12),'aahhjjhhffeeccaa'.charCodeAt(int(q*4)%30)-23);
	bass = q*55*pow(pow(2,1.0/12),'aahthhjejhetrrrqqqooqm'.charCodeAt(int(q*4)%30)-47);
	return (sin(lead*1)/5)+(sin(bass/2)/4);
}
