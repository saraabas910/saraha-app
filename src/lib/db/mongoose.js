import mongoose from "mongoose";
import {config} from "dotenv";
import { env } from "../config/env.js";

config();

mongoose.connect(env.db.url)