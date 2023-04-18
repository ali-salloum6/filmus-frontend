import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const DATA_SOURCE_URL = "http://localhost:4000/users/";

export async function GET(request: Request, resp: Response) {
  // const split = request.url.split("/");

  // const userId = split[4];
  // const movieId = split[6];

  const token: string =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDNjMDgxMzEwZWVkMzJkNjFkYmI4NmIiLCJ1c2VybmFtZSI6IkVsM29zOSIsImVtYWlsIjoiZWwzb3M5QGdtYWlsLmNvbSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTY1NTgyNywiZXhwIjoxNjgzMzgzODI3fQ.9US1pRymeuHp4OVfqt25I7xRRrlYrWCObiU1rprAfJg";

  const res: IMovieResponse = await axios.get(
    "http://localhost:4000/users/643b32c2b1c4132890c6d8da/loved",
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );

  console.log("Respo: ", res);

  return NextResponse.json(res);
}
