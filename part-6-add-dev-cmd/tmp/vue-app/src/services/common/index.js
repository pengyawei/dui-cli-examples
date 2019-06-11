import Vue from 'vue'
import serviceConfig from '@/configs/service.config.js'

const { axios } = Vue
const { post } = axios
const { urls } = serviceConfig
const { WHITE_LIST } = urls

export function getWhiteList(payload) {
  return post(WHITE_LIST, payload)
}
