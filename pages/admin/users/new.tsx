export default function New() {
  return (
    <div>
      <div className="newUserTitle">New User</div>
      <form className="userUpdateForm flex justify-between mt-5">
        <div className="userUpdateLeft">
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">First Name</label>
            <input
              type="text"
              className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
              placeholder="first name"
            />
          </div>
          <div className="userUpdateItem flex flex-col mt-2">
            <label className="mb-1 text-sm">Last Name</label>
            <input
              type="text"
              className="userUpdateInput shadow-sm w-60 text-base"
              placeholder="last name"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
