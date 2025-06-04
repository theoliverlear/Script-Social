import {TextElementLink} from "../models/link/TextElementLink";
import {TargetType} from "../models/html/TargetType";
import { ElementLink } from "../models/link/ElementLink";

export const navBarHomeElementLink = new ElementLink('/',
                                                         TargetType.SELF);
export const navBarSearchElementLink = new ElementLink('/search',
                                                           TargetType.SELF);
export const navBarAccountElementLink = new ElementLink('/authorize',
                                                            TargetType.SELF);