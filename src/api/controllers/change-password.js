import * as utils from '../../utils/utils-index.js';
import { Doctor } from '../../models/models-index.js';
import * as validate from '../validators/user-validator.js';
import { auth0_domain, client_id } from '../../config/config.js';
import bcrypt from "bcrypt";
import axios from 'axios'; // Use axios or any HTTP client to make the request

const requestPasswordChange = async (email) => {
    await axios.post(`${auth0_domain}/dbconnections/change_password`, {
        client_id, // Required: Your Auth0 client ID
        email: email, // Required: User's email address
        connection: 'Username-Password-Authentication', // Required: The name of the database connection
    });
}


export const changePassword = async (req, res) => {
    try {
        const deleteAuthenticators = req.body.deleteAuthenticators || false;
        const email = req.body.email; // Extract email from the request body
        const userId = req.auth.payload.sub; // Extract userId from the request body
        console.log(req.auth.payload);

        // Validate input
        if (!email) {
            throw new utils.ValidationError('Email is required');
        }

        // Initiate a password change
        await requestPasswordChange(email);

        // await utils.userManager.deleteAllAuthenticators({ id: userId });
        // if (deleteAuthenticators) {
        //     // Optionally, invalidate the user's existing sessions or tokens
        // }

        // Send success response
        return utils.sendSuccess(res, 'Password change ticket generated successfully!', {
            ticketUrl: ticket.ticket,
        });
    } catch (error) {
        console.error('Error in change-password controller:', error);
        return utils.sendError(res, error);
    }
};