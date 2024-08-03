const extractPlainText =(html)=> {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText;
}
export default extractPlainText;