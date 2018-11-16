var serverURL = (function() {

    //var url = 'http://ec2-35-182-251-181.ca-central-1.compute.amazonaws.com:3001';
    var url = 'https://task-ceiline.herokuapp.com/';

    var getURL = function() {
        return url;
    };


    return {
        getURL: getURL,
    }

    })();

export default serverURL;
