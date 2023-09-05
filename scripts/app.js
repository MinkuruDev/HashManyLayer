const hashFuntions = {
    "md5": md5,
    "sha1": sha1,
    "sha224": sha224,
    "sha256": sha256,
    "sha384": sha384,
    "sha512": sha512,
    "sha3_224": sha3_224,
    "sha3_256": sha3_256,
    "sha3_384": sha3_384,
    "sha3_512": sha3_512,
}

let current = 0;
const listSelect = document.querySelector("#list");
const mainInput = document.querySelector("#mainInput");
const hashName = [
    "md5", "sha1", "sha224", "sha256", "sha384", "sha512",
    "sha3_224", "sha3_256", "sha3_384", "sha3_512"
]

function createSelectElement(id){
    let div = document.createElement("div");
    div.id = `seg_${id}`;
    div.innerHTML = `
        <br/> <label>Layer ${id}</label> <br/>
        <label>Input: </label>
        <span class="input"></span> <br/>
        <label>Hash Function: </label>
        <select onChange="segOnChange(this)">
            <option value="md5">md5</option>
            <option value="sha1">sha1</option>
            <option value="sha224">sha224</option>
            <option value="sha256">sha256</option>
            <option value="sha384">sha384</option>
            <option value="sha512">sha512</option>
            <option value="sha3_224">sha3_224</option>
            <option value="sha3_256">sha3_256</option>
            <option value="sha3_384">sha3_384</option>
            <option value="sha3_512">sha3_512</option>
        </select> <br/>
        <label>Output: </label>
        <span class="result"></span>
    `;
    return div;
}

function segOnChange(seg){
    let layerIndex = Number(seg.parentElement.id.split("_")[1]);
    updateHashLayer(layerIndex);
}

function addNewSelect(){
    current++;
    listSelect.appendChild(createSelectElement(current));
    updateHashLayer(current);
    updateHashLayerText();
}

function updateHash(){
    updateHashLayer(1);
}

function updateHashLayerText(){
    document.querySelector("#hashLayerTxt").innerHTML = current;
}

function removeSelect(){
    if(current == 0) return;
    document.querySelector(`#seg_${current}`).remove();
    current--;
    updateHashLayerText();
}

function randomHash(){
    if(current == 0) return;
    for(let i = 1; i<=current; i++){
        let index = Math.floor(Math.random() * hashName.length);
        document.querySelector(`#seg_${i}`).querySelector("select").value = 
            hashName[index];
    }
    updateHashLayer(1);
}

function updateHashLayer(layer){
    if(layer > current) return;
    let div = document.querySelector(`#seg_${layer}`);
    if(layer == 1) {
        div.querySelector(".input").innerHTML = mainInput.value;
    }else{
        let beforeDiv = document.querySelector(`#seg_${layer-1}`);
        div.querySelector(".input").innerHTML = beforeDiv.querySelector(".result").innerHTML;
    }
    let seg = div.querySelector("select");
    div.querySelector(".result").innerHTML =
        hashFuntions[seg.value](div.querySelector(".input").innerHTML);
    updateHashLayer(layer+1);
}

function main(){
    addNewSelect();
}

main();
