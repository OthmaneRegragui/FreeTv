const queryString = window.location.search;
let paramString = new URLSearchParams(queryString);
var Code=""

function InsertCountries(obj){
    let selectCountrie=$("#selectCountrie")
    selectCountrie.append(`<option value="${obj.code}">${obj.name}</option>`)
}





function getCountries(){
    let fetchRes =fetch("https://iptv-org.github.io/api/countries.json");
    fetchRes.then(res =>res.json())
    .then(res=> {
        let Block=Array.from(res)
        Block.map(function(x){InsertCountries(x)})
    }) 
}



$("#selectCountrie").change(function(){
    let Tv=$("#Tv")
    Tv.html("")
    Code=$("#selectCountrie").val()
    if(Code!=""){
        GetTV()
    }
    
})



function Watch(Url){
    var video = document.getElementById('Vid');
    $('#Vid').html("")
    $('#Vid').html(`<video id="Vid" controls width="640" height="360"></video>`)
    if (typeof Hls == "undefined") return;
    if (!document.querySelector("video")) return;
    var hls = new Hls();
    hls.loadSource(Url);
    hls.attachMedia(document.querySelector("video"));
    video.addEventListener('canplay', function() {
        video.play();
    });


}
function InsertTv(obj){
    let Tv=$("#Tv")
    if(obj.Countrie!=undefined && obj.Name!=undefined && obj.Countrie.code==Code){
        let cTv=$(`<tr><td>${obj.Countrie.code}</td><td>${obj.Name}</td><td> <button onclick="Watch('${obj.Url}')"> Watch</button> </td> </tr>`)
        Tv.append(cTv)
    }
    
    
}    

function GetTV() {
    
    let fetchRes =fetch("https://iptv-org.github.io/iptv/channels.json");
    fetchRes.then(res =>res.json())
    
    .then(res=> {
        Block=Array.from(res)
        Block.map(function(x){
            InsertTv({"Name":x.name,"Url":x.url,"Countrie":x.countries[0]})})
    })
}