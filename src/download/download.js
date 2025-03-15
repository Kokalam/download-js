const fs = require('fs');

/** Download a file through an http request 
 * @param {string} resource URI of the resource to download
 * @param {object} option options of the request
 *  {
 *      download: {targetDirectory: string}
 *      ... // see fetch options
 *  }
*/
function download(resource, option) {

    const {download: downloadOption, ...fetchOption} = option;
    fetch(resource, fetchOption)
        .then(response => {

            const filename = response.headers.get('Content-Disposition').split('filename=')[1].replace('"', '');
            const targetDir = downloadOption && downloadOption.targetDirectory 
                ? downloadOption.targetDirectory
                : '';
            const writeablestream = fs.createWriteStream(targetDir + filename);

            response.getBody().pipe(writeablestream)

        })
        .catch((err) => console.error(err))

}