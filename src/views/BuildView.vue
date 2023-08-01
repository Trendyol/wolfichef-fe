<template>
  <section v-bind:class="styles['section']">
    <div
      v-bind:class="[
        styles.columns,
        styles['is-mobile'],
        styles['is-multiline'],
        styles['is-grid']
      ]"
    >
      <div
        v-bind:class="[
          styles.column,
          styles['is-12-mobile'],
          styles['is-10'],
          styles['order-2-mobile']
        ]"
      >
        <h1 v-bind:class="styles.title">WolfiChef</h1>
        <h2 v-bind:class="styles.subtitle">
          You can generate your own secure base images and push it to the your team's registry
        </h2>
      </div>
      <div v-bind:class="[styles.column, styles['is-4-mobile'], styles['order-1-mobile']]">
        <img v-bind:src="logo" v-bind:class="styles.image" alt="Trendyol" />
      </div>
    </div>

    <div v-bind:class="{ [styles.modal]: true, [styles['is-active']]: modalOpen }">
      <div v-bind:class="styles['modal-background']" v-on:click="triggerModal" />
      <div v-bind:class="styles['modal-content']">
        <div v-bind:class="styles['box']">
          <form v-on:submit.prevent="handleGenerate">
            <div v-bind:class="styles.field">
              <p v-bind:class="styles.help">
                You need to enter your
                <a
                  v-bind:href="
                    gitlabIntegration
                      ? `https://${gitlabDomain}/-/profile/personal_access_tokens?name=wolfi-deploy-token&scopes=read_repository,read_registry,write_registry`
                      : ``
                  "
                  target="_blank"
                  rel="noopener noreferrer"
                  >deploy token</a
                >
                to be able push this image to our registries.
              </p>
            </div>
            <div v-bind:class="styles.field">
              <label v-bind:class="styles.label" for="username">Deploy User</label>
              <div
                v-bind:class="[
                  styles.control,
                  errors.username.length > 0 && styles['has-icons-right']
                ]"
              >
                <input
                  id="username"
                  v-bind:class="styles.input"
                  type="text"
                  v-model="form.username"
                />
                <span
                  v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
                  v-if="errors.username.length > 0"
                >
                </span>
              </div>
            </div>
            <div v-bind:class="styles.field">
              <label v-bind:class="styles.label" for="token">Deploy token</label>
              <div
                v-bind:class="[
                  styles.control,
                  errors.token.length > 0 && styles['has-icons-right']
                ]"
              >
                <input id="token" v-bind:class="styles.input" type="text" v-model="form.token" />
                <span
                  v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
                  v-if="errors.token.length > 0"
                >
                </span>
              </div>
            </div>
            <div v-bind:class="styles.field">
              <div v-bind:class="styles.control">
                <button
                  v-bind:class="{
                    [styles.button]: true,
                    [styles['is-primary']]: true,
                    [styles['is-loading']]: loading
                  }"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>

    <form v-on:submit.prevent="handleSubmit" ref="formElement">
      <FormAlert v-for="(notification, id) in notifications" v-bind:key="id"
        >{{ notification }}
      </FormAlert>

      <div v-bind:class="styles.field">
        <div v-bind:class="[styles['is-flex'], styles['is-justify-content-space-between']]">
          <label for="registry" v-bind:class="styles.label"
            >Registry Url
            <a
              rel="noopener noreferrer"
              target="_blank"
              v-bind:href="gitlabIntegration && gitlab.url"
              v-if="gitlabIntegration && !token"
              >(use gitlab to fetch registries)
            </a>
          </label>
          <div v-bind:class="styles.field">
            <input
              id="advanced"
              type="checkbox"
              v-bind:class="[styles.switch, styles['is-rounded']]"
              v-model="showAdvanced"
            />
            <label for="advanced">Show Advanced Settings</label>
          </div>
        </div>
        <div
          v-bind:class="[
            styles.control,
            styles['has-icons-left'],
            errors.registry.length > 0 && styles['has-icons-right']
          ]"
        >
          <GitlabProjects
            v-if="gitlabIntegration && token"
            v-on:change="(value) => (form.registry = value)"
          />
          <input
            id="registry"
            v-bind:class="[styles.input, errors.registry.length > 0 && styles['is-danger']]"
            type="text"
            v-model="form.registry"
            v-else
          />
          <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
            <span v-bind:class="[styles.ico, styles['icon-gitlab']]" />
          </span>
          <span
            v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
            v-if="errors.registry.length > 0"
          >
            <span v-bind:class="[styles['is-danger'], styles.ico, styles['icon-circle-alert']]" />
          </span>
          <FormError v-bind:errors="errors" field="registry" />
        </div>
      </div>

      <div v-bind:class="styles.field">
        <label for="image" v-bind:class="styles.label">Image Name</label>
        <div
          v-bind:class="[
            styles.control,
            styles['has-icons-left'],
            errors.image.length > 0 && styles['has-icons-right']
          ]"
        >
          <input
            id="image"
            v-bind:class="[styles.input, errors.image.length > 0 && styles['is-danger']]"
            type="text"
            placeholder="go"
            v-model="form.image"
          />
          <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
            <span v-bind:class="[styles.ico, styles['icon-layers']]" />
          </span>
          <span
            v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
            v-if="errors.image.length > 0"
          >
            <span v-bind:class="[styles['is-danger'], styles.ico, styles['icon-circle-alert']]" />
          </span>
          <FormError v-bind:errors="errors" field="image" />
        </div>
      </div>

      <div v-bind:class="styles.field">
        <label for="tag" v-bind:class="styles.label">Tag</label>
        <div
          v-bind:class="[
            styles.control,
            styles['has-icons-left'],
            errors.tag.length > 0 && styles['has-icons-right']
          ]"
        >
          <input
            id="tag"
            v-bind:class="[styles.input, errors.tag.length > 0 && styles['is-danger']]"
            type="text"
            placeholder="latest"
            v-model="form.tag"
          />
          <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
            <span v-bind:class="[styles.ico, styles['icon-hash']]" />
          </span>
          <span
            v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
            v-if="errors.tag.length > 0"
          >
            <span v-bind:class="[styles['is-danger'], styles.ico, styles['icon-circle-alert']]" />
          </span>
          <FormError v-bind:errors="errors" field="tag" />
        </div>
      </div>

      <Transition name="slide-fade">
        <div v-bind:class="styles.field" v-show="showAdvanced">
          <label for="cwd" v-bind:class="styles.label">Current Working Directory</label>
          <div
            v-bind:class="[
              styles.control,
              styles['has-icons-left'],
              errors.cwd.length > 0 && styles['has-icons-right']
            ]"
          >
            <input
              id="cwd"
              v-bind:class="[styles.input, errors.cwd.length > 0 && styles['is-danger']]"
              type="text"
              placeholder="/app"
              v-model="form.cwd"
            />
            <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
              <span v-bind:class="[styles.ico, styles['icon-folder']]" />
            </span>
            <span
              v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
              v-if="errors.cwd.length > 0"
            >
              <span v-bind:class="[styles['is-danger'], styles.ico, styles['icon-circle-alert']]" />
            </span>
            <FormError v-bind:errors="errors" field="cwd" />
          </div>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <div v-bind:class="styles.field" v-show="showAdvanced">
          <label for="entrypoint" v-bind:class="styles.label">Entrypoint</label>
          <div
            v-bind:class="[
              styles.control,
              styles['has-icons-left'],
              errors.entrypoint.length > 0 && styles['has-icons-right']
            ]"
          >
            <input
              id="entrypoint"
              v-bind:class="[styles.input, errors.entrypoint.length > 0 && styles['is-danger']]"
              type="text"
              placeholder="/bin/bash"
              v-model="form.entrypoint"
            />
            <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
              <span v-bind:class="[styles.ico, styles['icon-box']]" />
            </span>
            <span
              v-bind:class="[styles.icon, styles['is-small'], styles['is-right']]"
              v-if="errors.entrypoint.length > 0"
            >
              <span v-bind:class="[styles['is-danger'], styles.ico, styles['icon-circle-alert']]" />
            </span>
            <FormError v-bind:errors="errors" field="entrypoint" />
          </div>
        </div>
      </Transition>

      <Transition name="slide-fade">
        <div v-bind:class="styles.field" v-show="showAdvanced">
          <div
            v-bind:class="[
              styles['is-flex'],
              styles['is-justify-content-space-between'],
              styles['is-clickable']
            ]"
          >
            <label v-bind:class="styles.label">Environments</label>
            <span
              v-on:click.prevent="addNewEnvironment"
              v-on:mouseenter="
                (e) => (e.target as HTMLElement).classList.add(styles['has-text-primary'])
              "
              v-on:mouseleave="
                (e) => (e.target as HTMLElement).classList.remove(styles['has-text-primary'])
              "
              ><span v-bind:class="[styles.ico, styles['icon-add-circle'], styles['mr-1']]" />Add
              New</span
            >
          </div>
          <div
            v-bind:class="[styles.field, styles['is-grouped']]"
            v-for="(environment, index) in form.environments"
            v-bind:key="`environment-${index}`"
          >
            <div
              v-bind:class="[
                styles.control,
                styles['has-icons-left'],
                styles['is-expanded'],
                errors.environments.length > 0 && styles['has-icons-right']
              ]"
            >
              <input
                v-bind:class="[styles.input, errors.tag.length > 0 && styles['is-danger']]"
                type="text"
                placeholder="PATH"
                v-model="environment.key"
              />
              <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
                <span v-bind:class="[styles.ico, styles['icon-key']]" />
              </span>
            </div>
            <div
              v-bind:class="[
                styles.control,
                styles['has-icons-left'],
                styles['is-expanded'],
                errors.environments.length > 0 && styles['has-icons-right']
              ]"
            >
              <input
                v-bind:class="[styles.input, errors.tag.length > 0 && styles['is-danger']]"
                type="text"
                placeholder="/bin:/sbin"
                v-model="environment.value"
              />
              <span v-bind:class="[styles.icon, styles['is-small'], styles['is-left']]">
                <span v-bind:class="[styles.ico, styles['icon-message']]" />
              </span>
            </div>
            <div
              v-bind:class="[styles.control, styles['is-flex'], styles['is-align-items-center']]"
            >
              <span
                v-bind:class="[styles.ico, styles['icon-trash'], styles['is-clickable']]"
                v-bind:style="{ color: '#d0021b' }"
                v-on:click.prevent="() => deleteEnvironment(index)"
              />
            </div>
            <FormError v-bind:errors="errors" field="environments" />
          </div>
        </div>
      </Transition>

      <div v-bind:class="styles.field">
        <label v-bind:class="styles.label">
          <PresetSelector v-on:change="fillPresetOptions" />
        </label>
        <div v-bind:class="styles.control">
          <Multiselect
            mode="tags"
            placeholder="Select packages"
            ref="multiselect"
            v-bind:classes="{
              ...multiselectClasses,
              container: ['multiselect', errors.packages.length > 0 && styles['has-errors']]
            }"
            v-bind:closeOnSelect="false"
            v-bind:hideSelected="false"
            v-bind:options="async (query: string) => await fetchPackages(query)"
            v-bind:searchable="true"
            v-model="form.packages"
            label="name"
            valueProp="name"
            v-bind:object="true"
            v-bind:infinite="true"
            v-bind:limit="20"
          >
            <template #option="value: SelectValue">
              <label v-bind:class="styles.checkbox">
                <input
                  type="checkbox"
                  v-bind:checked="value.isSelected(value.option)"
                  v-on:change="() => selectPackage(value)"
                />
                <div>
                  <svg v-bind:class="styles.check" viewBox="0 4 24 24" aria-hidden="true">
                    <polyline points="5 12 10 17 20 7"></polyline>
                  </svg>
                </div>
                <div
                  v-bind:class="styles['is-clickable']"
                  v-text="value.option.name"
                  v-on:mouseenter="utils.textHoverEnter"
                  v-on:mouseleave="utils.textHoverLeave"
                />
              </label>
            </template>
            <template #tag="value: TagValue">
              <PackageTag v-bind:value="value" />
            </template>
          </Multiselect>
          <FormError v-bind:errors="errors" field="packages" />
        </div>
      </div>

      <div v-bind:class="styles.field">
        <div
          v-bind:class="[
            styles['is-flex'],
            styles['is-justify-content-space-between'],
            styles['is-align-items-center']
          ]"
        >
          <p v-bind:class="styles.control">
            <button
              v-bind:class="{
                [styles.button]: true,
                [styles['is-primary']]: true,
                [styles['is-loading']]: loading
              }"
              type="submit"
            >
              Generate
            </button>
          </p>
          <p v-bind:class="styles.help" v-if="form.packages.length > 0">
            approximately image size will be
            <span v-bind:class="[styles['has-background-primary'], styles['p-1']]">{{
              utils.humanReadableBytes(
                form.packages.map((v) => v.installed_size).reduce((a, b) => a + b, 0)
              )
            }}</span>
          </p>
        </div>
      </div>
    </form>
  </section>
</template>

<script setup lang="ts">
import '@vueform/multiselect/themes/default.css'
import FormAlert from '@/components/FormAlert.vue'
import FormError from '@/components/FormError.vue'
import GitlabProjects from '@/components/GitlabProjects.vue'
import Multiselect from '@vueform/multiselect'
import PackageTag from '@/components/PackageTag.vue'
import PresetSelector from '@/components/PresetSelector.vue'
import axios, { AxiosError } from 'axios'
import logo from '@/assets/logo/ty-web.svg'
import styles from '@/assets/scss/main.module.scss'
import type { BuildForm, MultiSelectAPI, Package, SelectValue, TagValue } from '@/types'
import type { Ref } from 'vue'
import { computed, defineComponent, reactive, ref } from 'vue'
import { BuildValidation, validateForm } from '@/validators'
import utils from '@/utils'
import { useToast } from '@/stores/toast'

const toast = useToast()

defineComponent({
  components: { FormAlert, FormError, GitlabProjects, Multiselect, PackageTag, PresetSelector }
})

const formElement: Ref<HTMLElement | null> = ref(null)
const loading = ref(false)
const multiselect: Ref<MultiSelectAPI | undefined> = ref()
const notifications: string[] = reactive([])
const packages: Ref<Package[]> = ref([])

const form: BuildForm = reactive({
  cwd: '',
  entrypoint: '',
  environments: [],
  image: '',
  packages: [],
  registry: '',
  tag: '',
  token: '',
  username: ''
})

const errors: Record<keyof BuildForm, string[]> = reactive({
  cwd: [],
  entrypoint: [],
  environments: [],
  image: [],
  packages: [],
  registry: [],
  tag: [],
  token: [],
  username: []
})

const hasErrors = ref(false)
const modalOpen = ref(false)
const showAdvanced = ref(false)
const triggerModal = () => (modalOpen.value = !modalOpen.value)

const handleSubmit = async () => (await validate()) && triggerModal()
const handleGenerate = async () => (await validate()) && generate()

const gitlabIntegration = computed(() => import.meta.env.VITE_ENABLE_GITLAB_INTEGRATION === 'true')
const gitlabDomain = computed(() => import.meta.env.VITE_GITLAB_DOMAIN)
const gitlab: Ref<{ url: string; state: string }> = ref({
  url: '',
  state: ''
})
const token = ref(localStorage.getItem('access_token'))

if (gitlabIntegration.value) {
  const channel = new BroadcastChannel('oauth')
  channel.onmessage = (e) => {
    if (e.origin !== window.location.origin) return
    token.value = localStorage.getItem('access_token')
  }

  utils.fetchGitlabUser().then(({ username }) => (form.username = username))

  axios.get('gitlab/url').then(({ data }) => {
    gitlab.value = data
    localStorage.state = data.state
  })
}

const fetchPackages = (query: string) =>
  axios.get('wolfi/packages', { params: { query } }).then(({ data }) => {
    packages.value = data
    return data
  })

const clearErrors = () => {
  Object.keys(errors).map((key) => {
    const typedKey = key as keyof BuildForm
    errors[typedKey] = []
  })
}

const validate = async () => {
  loading.value = true
  hasErrors.value = false

  await validateForm(BuildValidation, form)
    .then(clearErrors)
    .catch((errs: Record<keyof BuildForm, string[]>) => {
      clearErrors()
      Object.keys(errs).map((key) => {
        const typedKey = key as keyof BuildForm
        errors[typedKey] = errs[typedKey]
      })
      hasErrors.value = true
    })
    .finally(() => (loading.value = false))

  return !hasErrors.value
}

const generate = async function () {
  loading.value = true
  const { cwd, entrypoint, environments, image, packages, registry, tag, token, username } = {
    ...form,
    packages: form.packages.map((pkg) => pkg.name)
  }
  axios
    .post('wolfi/build', {
      cwd,
      entrypoint,
      environments,
      image,
      packages,
      registry,
      tag,
      token,
      username
    })
    .then(({ data }: { data: string }) => {
      modalOpen.value = false
      notifications.push(`Image successfully pushed to the registry. Digest: ${data}`)
      formElement.value!.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      })
    })
    .catch((err: AxiosError) => {
      toast.showError({
        title: 'Error',
        message: err.message
      })
    })
    .finally(() => {
      loading.value = false
    })
}

const selectPackage = (value: SelectValue) => {
  if (value.isSelected(value.option)) {
    multiselect.value?.remove(value.option)
  } else {
    multiselect.value?.select(value.option)
  }
}

const multiselectClasses = {
  containerOpen: '',
  dropdown: [styles['multiselect-dropdown'], 'multiselect-dropdown'],
  option: ['multiselect-option', styles['multiselect-option']],
  optionPointed: styles['multiselect-option-pointed'],
  optionSelected: '',
  optionSelectedPointed: styles['multiselect-option-pointed']
}

const addNewEnvironment = () => form.environments.push({ key: '', value: '' })

const deleteEnvironment = (index: number) => form.environments.splice(index, 1)

const fillPresetOptions = (
  value: Partial<Omit<BuildForm, 'packages'>> & { packages: string[] }
) => {
  multiselect.value?.clear()

  const entries: [string, any][] = Object.entries(value)
  entries.forEach(([key, value]) => {
    if (!value || key === 'packages') return
    form[key as keyof BuildForm] = value
  })

  value.packages.map((pkg) => {
    const p = packages.value.filter((p) => p.name === pkg)
    multiselect.value?.select(p)
  })
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.6s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
