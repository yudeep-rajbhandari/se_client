import React, { useState, useEffect } from "react";
import RoomService from "../../../services/RoomService";

export default function EditRoomForm(props) {
  const [name, setName] = useState();
  const [roomType, setRoomType] = useState();
  const [isBookable, setIsBookable] = useState();
  function setFormDefaultValues() {
    setName(props.selectedRoom.name);
    setIsBookable(false);
  }

  useEffect(() => {
    setFormDefaultValues();
  }, [props.selectedRoom]);

  function onSave(event) {
    event.preventDefault();
    const room = {
      id: props.selectedRoom.id,
      name: name,
      roomType: roomType,
      isBookable: isBookable,
    };

    updateRoom(room);
  }

  async function updateRoom(room) {
    await RoomService.updateRoom(room);
    props.makeEditFalse();
  }
  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleRoomTypeChange(event) {
    setRoomType(event.target.value);
  }
  function handleIsBookableChange(event) {
    setIsBookable(event.target.checked);
  }

  return (
    <div>
      <h3> Edit Room: {props.selectedRoom.name}</h3>

      <form>
        <label htmlFor="name"> Name</label>
        <input
          defaultValue={name}
          type="name"
          id="name"
          onChange={handleNameChange}
        />

        <br />
        <label htmlFor="roomType">
          Room Type
          <select onChange={handleRoomTypeChange}>
            <option value={null}>Select Room Type </option>
            <option value="classroom">Class Room</option>
            <option value="washroom">Wash Room</option>
            <option value="lab">Lab</option>
            <option value="staffroom">Staff Room</option>
          </select>
        </label>

        <br />
        <label htmlFor="isBookable">Bookable?</label>
        <input
          type="checkbox"
          onChange={handleIsBookableChange}
          defaultValue={false}
        />
        <button type="submit" onClick={onSave}>
          Save
        </button>
      </form>
    </div>
  );
}
