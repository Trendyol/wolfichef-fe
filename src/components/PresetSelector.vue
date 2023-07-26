<template>
  <Multiselect
    placeholder="placeholder"
    v-bind:classes="{
      wrapper: [$style.wrapper, styles['is-relative']],
      container: [$style.container, styles['is-relative']],
      dropdown: [styles['multiselect-dropdown'], 'multiselect-dropdown'],
      placeholder: '',
      option: ['multiselect-option', styles['multiselect-option']],
      optionPointed: styles['multiselect-option-pointed'],
      optionSelected: styles['multiselect-option-pointed'],
      optionSelectedPointed: styles['multiselect-option-pointed']
    }"
    v-bind:caret="false"
    v-bind:canClear="false"
    v-bind:options="options"
  >
    <template #placeholder>
      <span
        v-bind:class="styles['has-tooltip-arrow']"
        data-tooltip="You can click here to use presets!"
        >Packages<span
          v-bind:class="[styles.ico, styles['icon-add-circle'], styles['ml-1'], styles.preset]"
        />
      </span>
    </template>
    <template #singlelabel>
      <span
        v-bind:class="styles['has-tooltip-arrow']"
        data-tooltip="You can click here to use presets!"
        >Packages<span
          v-bind:class="[styles.ico, styles['icon-add-circle'], styles['ml-1'], styles.preset]"
        />
      </span>
    </template>
  </Multiselect>
</template>

<script setup lang="ts">
import Multiselect from '@vueform/multiselect'
import styles from '@/assets/scss/main.module.scss'
import type { BuildForm } from '@/types'
import { defineComponent } from 'vue'

defineComponent({
  components: {
    Multiselect
  }
})

const options: Array<{
  label: string
  value: Partial<Omit<BuildForm, 'packages'>> & { packages: string[] }
}> = [
  {
    label: 'Node 19',
    value: {
      cwd: '/app',
      entrypoint: '/usr/bin/node',
      environments: [
        { key: 'NODE_PORT', value: '3000' },
        { key: 'PATH', value: '/usr/sbin:/sbin:/usr/bin:/bin' },
        { key: 'NPM_CONFIG_UPDATE_NOTIFIER', value: 'false' }
      ],
      packages: [
        'git',
        'tzdata',
        'busybox',
        'nghttp2',
        'nodejs-19',
        'wolfi-baselayout',
        'ca-certificates-bundle'
      ]
    }
  },
  {
    label: 'Java Runtime Environment 11',
    value: {
      cwd: '/app',
      entrypoint: '/usr/bin/java',
      environments: [
        { key: 'LANG', value: 'en_US.UTF-8' },
        { key: 'JAVA_HOME', value: '/usr/lib/jvm/java-11-openjdk' }
      ],
      packages: ['openjdk-11-jre', 'openjdk-11-default-jvm', 'glibc-locale-en', 'libstdc++']
    }
  },
  {
    label: 'Java Runtime Environment 17',
    value: {
      cwd: '/app',
      entrypoint: '/usr/bin/java',
      environments: [
        { key: 'LANG', value: 'en_US.UTF-8' },
        { key: 'JAVA_HOME', value: '/usr/lib/jvm/java-17-openjdk' }
      ],
      packages: ['openjdk-17-jre', 'openjdk-17-default-jvm', 'glibc-locale-en', 'libstdc++']
    }
  },
  {
    label: 'Java Development Kit 11',
    value: {
      cwd: '/app',
      entrypoint: '/usr/bin/java',
      environments: [
        { key: 'LANG', value: 'en_US.UTF-8' },
        { key: 'JAVA_HOME', value: '/usr/lib/jvm/openjdk-jre' }
      ],
      packages: [
        'busybox',
        'openjdk-11-jre',
        'openjdk-11-default-jvm',
        'glibc-locale-en',
        'libstdc++'
      ]
    }
  },
  {
    label: 'Java Development Kit 17',
    value: {
      cwd: '/app',
      entrypoint: '/usr/bin/java',
      environments: [
        { key: 'LANG', value: 'en_US.UTF-8' },
        { key: 'JAVA_HOME', value: '/usr/lib/jvm/openjdk-jre' }
      ],
      packages: [
        'busybox',
        'openjdk-17-jre',
        'openjdk-17-default-jvm',
        'glibc-locale-en',
        'libstdc++'
      ]
    }
  },
  {
    label: 'Python 3.10',
    value: {
      entrypoint: '/usr/bin/python',
      packages: ['tzdata', 'python-3.10', 'wolfi-baselayout', 'ca-certificates-bundle']
    }
  },
  {
    label: 'Python 3.11',
    value: {
      entrypoint: '/usr/bin/python',
      packages: ['tzdata', 'python-3.11', 'wolfi-baselayout', 'ca-certificates-bundle']
    }
  }
]
</script>

<style lang="scss" module>
.container {
  width: 400px;
}
.wrapper {
  width: max-content;
  margin: 0;
}
</style>
