<b-modal id="modal-add-yt" title="Add from YouTube" ok-title="Add episode">
	<div class="loader" v-if="loading.ytModal" v-cloak>
		<span class="fas fa-circle-notch fa-spin"></span>
		Loading videos
	</div>
	<ul v-else class="video-list">
		<li v-for="(_ytVideo, index) in ytVideos" @click="ytVideo = _ytVideo">
			<img v-if="_ytVideo.thumbnail" :src="_ytVideo.thumbnail.url" :class="{'active':ytVideo.id == _ytVideo.id}" />
			<p v-text="_ytVideo.title"></p>
		</li>
	</ul>
	<b-form>
		<b-form-group label="Video ID:" label-for="yt-form-video-id">
			<b-form-input id="yt-form-video-id" v-model="ytVideo.id" type="text" placeholder="" required disabled></b-form-input>
		</b-form-group>

		<b-form-group label="Date:" label-for="yt-form-date" description="Your episodes are ordered based on this field.">
			<date-picker v-model="ytVideo.date" :config="{ format: 'DD/MM/YYYY HH:mm', useCurrent: true }"></date-picker>
		</b-form-group>

		<b-form-group label="Title:" label-for="yt-form-title">
			<b-form-input id="yt-form-title" v-model="ytVideo.title" type="text" placeholder="Type here" required></b-form-input>
		</b-form-group>

		<b-form-group label="Description:" label-for="yt-form-description">
			<b-form-textarea id="yt-form-description" v-model="ytVideo.description" placeholder="Type here" rows="3" max-rows="6"></b-form-textarea>
		</b-form-group>
	</b-form>
</b-modal>