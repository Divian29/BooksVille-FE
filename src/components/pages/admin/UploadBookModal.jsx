import {useState} from "react";
import axios from "../../../api/axios.jsx";
import {ClipLoader} from "react-spinners";
import {useNavigate} from "react-router-dom";

export const UploadBookModal = ({ onCancel, formData, handleStatus, setStatusTitle, setStatusMessage, setStatusColor }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  const [clip, setClip] = useState(false);

  const navigate = useNavigate();

  const enableStatus = (title, message, color) => {
    handleStatus();
    setStatusTitle(title);
    setStatusMessage(message)
    setStatusColor(color)
  }

  const [fileData, setFileData] = useState({
    bookCover: null,
    bookFile: null
  });

  const handleChange = (e) => {
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = {
      author: formData.author,
      bookTitle: formData.bookTitle,
      genre: formData.genre,
      description: formData.description,
      price: formData.price,
      bookCover: fileData.bookCover,
      bookFile: fileData.bookFile
    }

    try {
      setClip(true);

      await axios.post("/book/add-book", newData, {
        headers: {
          'Authorization': `Bearer ${userData.accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      }).then(
          response => {
            setClip(false);

            enableStatus("Book Add", "Your book have been successfully added", "bg-green-600")

            setTimeout(() => {
              onCancel();
            }, 2500)
          }
      )
    } catch (error) {
      setClip(false);

      enableStatus("Oops!", "Something went wrong, Book Upload failed", "bg-red-600")
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <span className="flex items-center justify-between gap-5">
            <div className="text-neutral-800 text-2xl font-bold leading-9 my-auto">
              Upload files
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/86e4204a60fdd377f325c81195b1a519581b7bbd4a52935896c8d71c56b2e31b?"
              className="cursor-pointer aspect-square object-contain object-center w-6 overflow-hidden self-stretch shrink-0 max-w-full"
              onClick={onCancel}
            />
          </span>
          <span className="flex flex-col self-center items-center mt-5 w-[80%]">
            <div className="w-full max-h-100 border-2 border-dashed border-gray-500 rounded-lg p-4 mb-4 text-white text-center">
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1cfbfb96d1ceacff02d070ae42da5024bd9ae5b2349187bde6cad0ac1a1e5f?"
                  className="aspect-square mx-auto object-contain object-center w-12 overflow-hidden max-w-full"
              />

              <p className="text-black text-sm">Browse file here <span className="text-lg"><b>(BOOK COVER)</b></span> </p>

              <div className="truncate w-[90%] mx-auto text-green-600">
                   <input
                       type="file"
                       name="bookCover"
                       onChange={handleChange}
                       required
                   />
              </div>
            </div>

            <div className="w-full max-h-100 border-2 border-dashed border-gray-500 rounded-lg p-4 mb-4 text-white text-center">
              <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed1cfbfb96d1ceacff02d070ae42da5024bd9ae5b2349187bde6cad0ac1a1e5f?"
                  className="aspect-square mx-auto object-contain object-center w-12 overflow-hidden max-w-full"
              />

              <p className="text-black text-sm">Browse file here <span className="text-lg"><b>(BOOK FILE)</b></span> </p>

              <div className="truncate w-[90%] mx-auto text-green-600">
                   <input
                       type="file"
                       name="bookFile"
                       onChange={handleChange}
                       required
                   />
              </div>
            </div>
          </span>

          <span className="justify-between items-center flex gap-5 mt-3 self-center">
            <div
              onClick={onCancel}
              className="hover:bg-red-600 hover:text-white cursor-pointer text-red-500 text-sm font-medium leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-stretch border self-stretch grow px-4 py-3 rounded-md border-solid border-red-600"
            >
              Cancel
            </div>
            <button style={!clip ? {} : {backgroundColor: ""} } type="submit"
              className={`hover:bg-green-600 hover:text-white cursor-pointer ${ !clip ? '' : 'bg-green-500'} ${ !clip ? 'text-green-500' : 'text-white'} text-sm font-medium leading-5 tracking-[2px] uppercase whitespace-nowrap justify-center items-stretch border self-stretch grow px-4 py-3 rounded-md border-solid border-green-600`}
            >
              { !clip ? "Upload Book" : <ClipLoader color="#FFFFFF" loading={true} size={20} /> }
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};
