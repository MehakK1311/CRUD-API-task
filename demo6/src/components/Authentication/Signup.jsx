import { Country, State, City } from "country-state-city";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Box
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Select } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useToast } from "@chakra-ui/react";
import userSchema from "../../validation/userValidation";
import { registerFunc } from "../../services/Apis";
import { useHistory } from "react-router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {storage} from "../../firebase/firebase"

function Signup() {
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [country, setCountry] = useState("");
  const [countryId, setCountryId] = useState();
  const [stateId, setStateId] = useState();
  const [state, setState] = useState("-");
  const [city, setCity] = useState("-");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [link, setlink] = useState("");

  const handleSelectedFile = (files) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      console.log(files[0]);
    } else {
      console.log("File size to large");
    }
  };


  const toast = useToast();
  const inputRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => setShow(!show);

  const history = useHistory();

  const countries = Country.getAllCountries();
  let states = [];
  if (countryId) {
    states = State.getStatesOfCountry(countryId);
  }
  let cities = [];
  if (stateId) {
    cities = City.getCitiesOfState(countryId, stateId);
  }

  const handleCountry = async (event) => {
    const countryData = await event.target.value.split("%");
    setCountry(countryData[0]);
    setCountryId(countryData[1]);
  };

  const handleState = async (event) => {
    const stateData = await event.target.value.split("%");
    setState(stateData[0]);
    setStateId(stateData[1]);
  };

  const handleUploadFile = () => {
    if (imageFile) {
      const name = "xyz"
      const storageRef = ref(storage, `files/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setlink(url);
            setDownloadURL(url);
            setDocument(url)
            // console.log(document)
          });
        }
      );
    } else {
      console.log("File not found");
    }
  };

  const submitHandler = async () => {
    // console.log(document)
    setLoading(true);
    if (
      !firstname ||
      !lastname ||
      !age ||
      !email ||
      !salary ||
      !country ||
      !state ||
      !city ||
      !document ||
      !password
    ) {
      toast({
        title: "Please Fill All The Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    let formData = {
      firstname,
      lastname,
      age,
      email,
      salary,
      country,
      state,
      city,
      document,
      password,
    };
    const isValid = await userSchema.isValid(formData);
    if (isValid) {
      try {
        const config = {
          "Content-type": "application/json"
        };
        const data = await registerFunc(formData, config)
        console.log(data.data);
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        const user = localStorage.getItem("userInfo");
        const userData = JSON.parse(user);
        console.log(userData);
        history.push(`/profile/${userData.data._id}`);
      } catch (error) {
        console.log(error);
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="firstname" isRequired padding={"5px"}>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="Enter your first name"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </FormControl>
      <FormControl id="lastname" isRequired padding={"5px"}>
        <FormLabel>Last Name</FormLabel>
        <Input
          placeholder="Enter your last name"
          onChange={(e) => setLastname(e.target.value)}
        />
      </FormControl>
      <FormControl id="age" isRequired padding={"5px"}>
        <FormLabel>Age</FormLabel>
        <Input
          placeholder="Enter your Age"
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl id="email" isRequired padding={"5px"}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="salary" isRequired padding={"5px"}>
        <FormLabel>Salary</FormLabel>
        <Input
          placeholder="Enter your Salary"
          onChange={(e) => setSalary(parseInt(e.target.value))}
        />
      </FormControl>
      <FormControl id="country" isRequired padding={"5px"}>
        <FormLabel>Country</FormLabel>
        <Select
          placeholder="Select Country"
          id="country"
          onChange={handleCountry}
          defaultValue={country}
        >
          <option value="" label="Select Country" disabled />
          {countries.map((country, i) => {
            return (
              <option
                key={i}
                value={`${country.name}%${country.isoCode}`}
                label={country.name}
              />
            );
          })}
        </Select>
      </FormControl>
      <FormControl id="state" isRequired padding={"5px"}>
        <FormLabel>State</FormLabel>
        <Select
          placeholder="Select State"
          id="state"
          onChange={handleState}
          defaultValue={state}
        >
          <option value="-" label="Select State" />
          {states.map((state, i) => {
            return (
              <option
                key={i}
                value={`${state.name}%${state.isoCode}`}
                label={state.name}
              />
            );
          })}
        </Select>
      </FormControl>
      <FormControl id="city" isRequired padding={"5px"}>
        <FormLabel>City</FormLabel>
        <Select
          placeholder="Select City"
          id="city"
          onChange={(e) => setCity(e.target.value)}
          defaultValue={city}
        >
          <option value="-" label="Select City" />
          {cities.map((city, i) => {
            return <option key={i} value={city.name} label={city.name} />;
          })}
        </Select>
      </FormControl>
      <FormControl id="document" isRequired padding={"5px"} >
        <FormLabel>Document</FormLabel>
        <Box margin={"5px"}>

          <Button onClick={onOpen}>Accepted File Types</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Accepted File Types
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                .png, .jpg
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Input
          type="file"
          placeholder="Select file to upload"
          accept="application/pdf,application/doc,application/docx"
          onChange={(files) => handleSelectedFile(files.target.files)}
        />

        {imageFile && (
          <>

            <div className="text-left mt-3">
              <Button
                className="bg-blue-500"
                loading={isUploading}
                type="primary"
                onClick={handleUploadFile}
              >
                Upload
              </Button>

            </div>
          </>
        )}
        {downloadURL && (
          <>
            <h1>
              succesfully uploaded
            </h1>
          </>
        )}
      </FormControl>
      <FormControl id="password" isRequired padding={"5px"}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5em">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl padding={"5px"}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5em">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"orange"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;