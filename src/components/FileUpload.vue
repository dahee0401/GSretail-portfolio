<template>
    <div class="file_upload">
        <!-- PC: 드래그앤드롭 영역 - 파일 없을 때만 -->
        <!-- 파일추가 후 파일추가 영역 삭제 v-if="!files.length" -->
        <div
            class="drop_zone"
            :class="{ 'is_dragging': isDragging }"
            @dragover.prevent="onDragOver"
            @dragleave="onDragLeave"
            @drop.prevent="onDrop"
            @click="triggerInput"
        >
            <span class="drop_zone_icon" aria-hidden="true">
                <img src="@/assets/images/sub/icon_file_32.png" alt="file">
            </span>
            <p class="drop_zone_text" v-html="t.dropZoneDesc"></p>
            <button type="button" class="btn_mid btn_icon_more after" @click.stop="triggerInput">
                {{ t.dropZoneBtnLabel }}
            </button>
        </div>

        <!-- Mobile: 파일찾기 인풋 스타일 -->
        <div class="file_input_row" :class="{ has_error: showSizeError }" @click="triggerInput">
            <span class="file_input_row_name">{{ t.emptyMsg }}</span>
            <button type="button" class="btn_small" @click.stop="triggerInput">{{ t.dropZoneBtnLabel2 }}</button>
        </div>

        <!-- 실제 input -->
        <input
            ref="inputRef"
            type="file"
            class="hidden_input"
            :multiple="multiple"
            :accept="accept"
            @change="onFileChange"
        />


        <!-- 선택된 파일 목록 -->
        <div v-if="files.length" class="file_list_wrap">
            <div v-if="files.length" class="file_list_inner">
                <div class="file_list_header">
                    <span class="file_count"><em>{{ files.length }}</em>/{{ maxCount }}{{ t.countUnit }}</span>
                    <button type="button" class="btn_clear" @click="clearAll">
                        <span class="icon_x" aria-hidden="true">✕</span> {{ t.clearAll }}
                    </button>
                </div>

                <ul class="file_list">
                    <li v-for="(file, i) in files" :key="i" class="file_list_item">
                        <span class="file_list_name">
                            {{ file.name }}
                            <em class="file_meta">[{{ getExt(file.name) }}, {{ formatSize(file.size) }}]</em>
                        </span>
                        <button type="button" class="file_list_remove" @click="removeFile(i)" :aria-label="t.removeLabel">✕</button>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 용량 초과 메시지 
        <p v-if="showSizeError" class="file_error_msg">{{ t.overSizeMsg }}</p>-->
    </div>
</template>

<script>
export default {
    name: "FileUpload",
    props: {
        lang: { type: String, default: "ko" },
        multiple: { type: Boolean, default: true },
        accept: { type: String, default: '*' },
        maxSize: { type: Number, default: 20 * 1024 * 1024 },
        maxCount: { type: Number, default: 10 }
    },

    emits: ['update:files'],

    data() {
        return {
            files: [],
            isDragging: false,
            showSizeError: false,
            langData: {
                ko: {
                    dropZoneDesc: "'파일추가' 버튼을 클릭하거나 파일을 마우스로 끌어서 등록 해 주세요.",
                    dropZoneBtnLabel: "파일추가",
                    dropZoneBtnLabel2: "파일찾기",
                    emptyMsg: "선택된 파일 없음",
                    countUnit: "개",
                    clearAll: "전체파일 삭제",
                    removeLabel: "파일 삭제",
                    overSizeMsg: "* 파일 총 용량이 20MB를 초과합니다. 파일을 삭제 후 다시 업로드해 주세요."
                }
            },
        };
    },

    computed: {
        t() { return this.langData[this.lang] || this.langData.ko; },
    },

    methods: {
        triggerInput() {
            this.$refs.inputRef?.click();
        },

        addFiles(newFiles) {
            const arr = Array.from(newFiles);
            const merged = this.multiple ? [...this.files, ...arr] : arr;
            const totalSize = merged.reduce((sum, f) => sum + f.size, 0);
            this.files = merged;
            this.showSizeError = totalSize > this.maxSize;
            this.$emit('update:files', this.files);
        },

        onFileChange(e) {
            this.addFiles(e.target.files);
            e.target.value = '';
        },

        onDragOver() { this.isDragging = true; },
        onDragLeave() { this.isDragging = false; },
        onDrop(e) {
            this.isDragging = false;
            this.addFiles(e.dataTransfer.files);
        },

        removeFile(i) {
            this.files = this.files.filter((_, idx) => idx !== i);
            const totalSize = this.files.reduce((sum, f) => sum + f.size, 0);
            this.showSizeError = totalSize > this.maxSize;
            this.$emit('update:files', this.files);
        },

        clearAll() {
            this.files = [];
            this.showSizeError = false;
            this.$emit('update:files', this.files);
        },

        getExt(name) {
            const parts = name.split('.');
            return parts.length > 1 ? parts.pop().toUpperCase() : '파일';
        },

        formatSize(bytes) {
            if (bytes < 1024) return bytes + 'B';
            if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + 'KB';
            return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
        }
    }
};
</script>

<style scoped>
.hidden_input { 
    display: none; 
}
.file_upload { 
    width: 100%; 
}

/* ========================
   PC: 드래그앤드롭 영역
======================== */
.drop_zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 600px;
    padding: 53px 20px;
    border: 1px solid #E5E5E9;
    border-radius: 16px;
    background: #F8F8F8;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
}
.drop_zone:hover {
    background: #E7F2FE;
}
.drop_zone.is_dragging { 
    border-color: #666; 
    background: #f0f0f0; 
}
.drop_zone_text { 
    font-size: 18px; 
    color: #4C4C53; 
    text-align: center; 
}
.btn_icon_more { 
    margin-top: 16px; 
    background: #D7D7DF; 
}
.btn_icon_more:after {
    width: 16px; 
    height: 16px;
    background: url('@/assets/images/common/icon_set_16.png') no-repeat -336px -13px;
}

/* ========================
   Mobile: 파일찾기 인풋
======================== */
.file_input_row {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: 18px 16px;
    border: 1px solid #E5E5E9;
    border-radius: 12px;
    background: #fff;
    cursor: pointer;
}
.file_input_row.has_error {
    border-color: #fb6432;
    background: #fff5f2;
}
.file_input_row_name {
    font-size: 16px; 
    color: #9999a6; 
    flex: 1;
    overflow: hidden; 
    text-overflow: ellipsis; 
    white-space: nowrap;
}
.btn_small {
    flex-shrink: 0; 
    padding: 6px 16px; 
    height: 36px;
    border: 1px solid #c4c4d0; 
    border-radius: 8px;
    font-size: 14px; 
    color: #161616; 
    cursor: pointer; 
    background: #fff;
}

/* ========================
   용량 초과 메시지
======================== */
.file_error_msg { 
    margin-top: 8px; 
    font-size: 13px; 
    color: #fb6432; }

/* ========================
   파일 목록
======================== */
.file_list_wrap { 
    width: 600px;
    max-height: 240px; /* 260623 edit 이소라 */
    margin-top: 8px;
    padding: 16px;
    border: 1px solid #E5E5E9;
    border-radius: 16px;
    background: #F8F8F8;
}
.file_list_inner {
    max-height: 208px; /* 260623 edit 이소라 */
    overflow-y: auto;
}
.file_list_header {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    margin-bottom: 8px; 
    padding: 0 4px;
}
.file_count { 
    font-size: 14px; 
    color: #1d1d1d; }
.file_count em { 
    font-style: normal; 
    color: #107AF2; 
}
.btn_clear {
    display: flex; 
    align-items: center; 
    gap: 4px;
    border: none; 
    background: none; 
    font-size: 14px;
    color: #161616; 
    cursor: pointer; 
    padding: 0;
}
.btn_clear:hover { 
    color: #161616;
 }
.icon_x { 
    margin-right: 5px;
    font-size: 14px;
    color: #242428;
}

.file_list { 
    list-style: none; 
    padding: 0; 
    display: flex; 
    flex-direction: 
    column; gap: 6px; 
}
.file_list_item {
    display: flex; 
    align-items: center; 
    justify-content: space-between;
    gap: 8px; 
    padding: 16px 20px;
    border: 1px solid #E5E5E9; 
    border-radius: 12px;
    background: #fff; 
    font-size: 15px;
}
.file_list_name {
    flex: 1; 
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
    color: #161616;
    display: flex; 
    align-items: center; 
    gap: 6px;
}
.file_list_remove {
    flex-shrink: 0; 
    border: none; 
    background: none;
    color: #242428; 
    cursor: pointer; 
    font-size: 20px; 
    padding: 0; 
    line-height: 1;
}
.file_list_remove:hover { 
    color: #161616; 
}

/* ========================
   반응형
======================== */
@media (max-width: 768px) {
    .drop_zone { 
        display: none; 
    }
    .file_input_row { 
        display: flex; 
    }
    .file_list_wrap { 
        margin-top: 12px; 
    }
    .file_list_wrap { 
        width: 100%;
        height: auto;
        margin-top: 8px;
        padding: 0;
        border: 0;
        border-radius: 0;
        background: none;
    }
    .file_list_inner {
        height: auto;
    }
    .file_list_item { 
        padding: 14px 16px; 
    }
}
</style>
