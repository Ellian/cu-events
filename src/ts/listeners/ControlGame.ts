/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import EventEmitter from '../classes/EventEmitter';
import REST from 'cu-restapi';
declare const cuAPI: any;

const EVENT_NAME = 'controlgame';
const POLL_INTERVAL = 5000;
let timer : any;

function run(emitter: EventEmitter) {
	let rest = new REST();
	function tick() {
		// TODO: switch to using cu-restapi
		rest.controlGame({ includeControlPoints: true }).then((data:any) => {
			emitter.emit(EVENT_NAME, data);
		}, (status: string, errorThrown: string) => {
			emitter.emit(EVENT_NAME, { error: { status: status, reason: errorThrown }});
		});
	}
	if (!timer) {
		setInterval(tick, POLL_INTERVAL);
	}
}

export default class ControlGameListener {
	listening: boolean = false;
	type: string;
	constructor() {
		this.listening = false;
	}
	start(emitter : EventEmitter) : void {
		if (!this.listening) {
			this.listening = true;
			run(emitter);
		}
	}
	stop() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
			this.listening = false;
		}
	}
}