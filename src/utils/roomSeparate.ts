const RoomSeparate = (room: string) => {
  try {
    const result = room.split(",").map((room) => {
      return {
        room: room,
      };
    });
    return result;
  } catch (error) {
    return [];
  }
};

export default RoomSeparate;
