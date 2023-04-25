import React, { FormEvent, useState } from "react";
import {
    HStack,
    Image,
    Text,
    VStack,
    Stack,
    Button,
    Input,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL, unavailable, img_500 } from "../../config/config";
import useFetch from "../../hooks/useFetch";
import ILoginResponse from "../../interfaces/LoginResponse";
import IRegisterData from "../../interfaces/RegisterData";

import IUpdatedUser from "../../interfaces/UpdatedUser";

const Profile = () => {
    return <div>profile</div>;
};

export default Profile;
