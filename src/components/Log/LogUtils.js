// C:\VsCodeProjects\my-course-web\src\components\Log\LogUtils.js
import axios from 'axios';

export const addLogEntry = async (userID, logAction) => {
    try {
        await axios.post('http://localhost:8080/logs/user', {
            userID: userID,
            logAction: logAction
        });
    } catch (error) {
        console.error('Error adding log entry:', error);
    }
};
