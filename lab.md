---
layout: default
title: Human Aware Systems Lab
permalink: /lab/
---
{% assign lab = site.data.lab %}
{% assign lab_members = lab.current_members | concat: lab.alumni %}

<section class="lab-hero shell">
  <div class="section-label"><span data-lang="en">Human Aware Systems</span><span data-lang="ko">Human Aware Systems 연구실</span></div>
  <div class="lab-title-row">
    <div>
      <h1>HAS <span class="lab-title-full">Human Aware Systems</span></h1>
      <p class="lab-lead">
        <span data-lang="en">We study networked and computing systems with people, operational context, and real-world constraints in the loop.</span>
        <span data-lang="ko">사람과 운용 맥락, 현실적 제약을 시스템 설계와 평가에 함께 반영하는 네트워크·컴퓨팅 시스템을 연구합니다.</span>
      </p>
    </div>
    <div class="lab-meta">
      <span><span data-lang="en">Directed by</span><span data-lang="ko">지도교수</span></span>
      <strong>Byungjin Jun · 전병진</strong>
      <span><span data-lang="en">Korea Military Academy</span><span data-lang="ko">육군사관학교 컴퓨터과학과</span></span>
    </div>
  </div>
  <div class="lab-focus-tags" aria-label="Research areas">
    <span>Human-Centered Systems</span>
    <span>Networks & QoE</span>
    <span>Security</span>
    <span>Mission-Critical Systems</span>
  </div>
</section>

<section class="section shell lab-section" id="current-members">
  <div class="lab-section-head">
    <div>
      <div class="section-label"><span data-lang="en">People</span><span data-lang="ko">구성원</span></div>
      <h2><span data-lang="en">Current students</span><span data-lang="ko">현재 지도 학생</span></h2>
    </div>
    <p><span data-lang="en">Students are jointly advised with their home institutions.</span><span data-lang="ko">모든 학생은 소속 대학의 지도체계와 함께 공동지도합니다.</span></p>
  </div>

  {% if lab.current_members.size > 0 %}
  <div class="member-grid">
    {% for member in lab.current_members %}
      <article class="member-card" id="member-{{ member.id }}">
        <div class="member-topline">
          <span class="member-status"><span data-lang="en">Co-advised</span><span data-lang="ko">공동지도</span></span>
          {% if member.period %}<span class="member-period">{{ member.period }}</span>{% endif %}
        </div>
        <h3><span data-lang="en">{{ member.name_en }}</span><span data-lang="ko">{{ member.name_ko | default: member.name_en }}</span></h3>
        {% if member.program_en or member.program_ko %}
        <p class="member-program"><span data-lang="en">{{ member.program_en }}</span><span data-lang="ko">{{ member.program_ko | default: member.program_en }}</span></p>
        {% endif %}
        <div class="member-detail">
          <span class="member-detail-label"><span data-lang="en">Home institution</span><span data-lang="ko">소속 대학</span></span>
          <strong><span data-lang="en">{{ member.institution_en }}</span><span data-lang="ko">{{ member.institution_ko | default: member.institution_en }}</span></strong>
        </div>
        {% if member.coadvisor_en or member.coadvisor_ko %}
        <div class="member-detail">
          <span class="member-detail-label"><span data-lang="en">Co-advisor</span><span data-lang="ko">공동 지도교수</span></span>
          <strong><span data-lang="en">{{ member.coadvisor_en }}</span><span data-lang="ko">{{ member.coadvisor_ko | default: member.coadvisor_en }}</span></strong>
        </div>
        {% endif %}
        {% if member.interests %}
        <div class="member-interests">
          {% for interest in member.interests %}<span>{{ interest }}</span>{% endfor %}
        </div>
        {% endif %}

        {% capture member_pubs %}
          {% for pub in lab.publications %}
            {% if pub.member_ids contains member.id %}
              <a href="#pub-{{ pub.id }}"><span>{{ pub.year }} · {{ pub.venue }}</span>{{ pub.title }}</a>
            {% endif %}
          {% endfor %}
        {% endcapture %}
        {% assign member_pubs_clean = member_pubs | strip %}
        {% unless member_pubs_clean == '' %}
          <div class="member-papers">
            <div class="member-detail-label"><span data-lang="en">Related publications</span><span data-lang="ko">관련 논문</span></div>
            {{ member_pubs }}
          </div>
        {% endunless %}
      </article>
    {% endfor %}
  </div>
  {% else %}
    <div class="empty-state">
      <span data-lang="en">Current student profiles will be added here.</span>
      <span data-lang="ko">현재 지도 학생 프로필을 이 영역에 추가할 예정입니다.</span>
    </div>
  {% endif %}
</section>

<section class="section section-tint lab-section" id="lab-publications">
  <div class="shell">
    <div class="lab-section-head">
      <div>
        <div class="section-label"><span data-lang="en">Work</span><span data-lang="ko">연구성과</span></div>
        <h2><span data-lang="en">Group publications</span><span data-lang="ko">연구실 논문</span></h2>
      </div>
      <p><span data-lang="en">Student names become direct links to their profiles when a publication is associated with a lab member.</span><span data-lang="ko">논문과 학생을 연결하면 저자 이름에서 해당 학생 프로필로 바로 이동할 수 있습니다.</span></p>
    </div>

    <div class="lab-publication-list">
      {% for pub in lab.publications %}
      <article class="lab-publication" id="pub-{{ pub.id }}">
        <div class="lab-pub-year">{{ pub.year }}</div>
        <div class="lab-pub-main">
          <h3>{% if pub.url %}<a href="{{ pub.url }}">{{ pub.title }} ↗</a>{% else %}{{ pub.title }}{% endif %}</h3>
          <p>{{ pub.authors }}</p>
          {% if pub.member_ids.size > 0 %}
          <div class="paper-member-links">
            <span class="paper-member-label"><span data-lang="en">HAS students</span><span data-lang="ko">HAS 학생</span></span>
            {% for member in lab_members %}
              {% if pub.member_ids contains member.id %}
                <a href="#member-{{ member.id }}"><span data-lang="en">{{ member.name_en }}</span><span data-lang="ko">{{ member.name_ko | default: member.name_en }}</span></a>
              {% endif %}
            {% endfor %}
          </div>
          {% endif %}
        </div>
        <div class="lab-pub-venue">{{ pub.venue }}</div>
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section shell lab-section alumni-section" id="alumni">
  <div class="lab-section-head">
    <div>
      <div class="section-label"><span data-lang="en">Alumni</span><span data-lang="ko">졸업생</span></div>
      <h2><span data-lang="en">Former students</span><span data-lang="ko">졸업 · 지도 완료 학생</span></h2>
    </div>
    <p><span data-lang="en">Completed students are kept here with their home institution and research connections.</span><span data-lang="ko">지도가 종료된 학생은 소속 대학과 연구성과 연결을 유지한 채 이 영역에 정리합니다.</span></p>
  </div>

  {% if lab.alumni.size > 0 %}
  <div class="alumni-list">
    {% for member in lab.alumni %}
      <article class="alumni-row" id="member-{{ member.id }}">
        <div>
          <h3><span data-lang="en">{{ member.name_en }}</span><span data-lang="ko">{{ member.name_ko | default: member.name_en }}</span></h3>
          <p><span data-lang="en">{{ member.institution_en }}</span><span data-lang="ko">{{ member.institution_ko | default: member.institution_en }}</span>{% if member.program_en %} · <span data-lang="en">{{ member.program_en }}</span><span data-lang="ko">{{ member.program_ko | default: member.program_en }}</span>{% endif %}</p>
        </div>
        <div class="alumni-period">{{ member.period }}</div>
        <div class="alumni-next">{% if member.next_en %}<span data-lang="en">{{ member.next_en }}</span><span data-lang="ko">{{ member.next_ko | default: member.next_en }}</span>{% endif %}</div>
      </article>
    {% endfor %}
  </div>
  {% else %}
    <div class="empty-state compact">
      <span data-lang="en">Alumni profiles will appear here.</span>
      <span data-lang="ko">졸업생 프로필은 이 영역에 정리됩니다.</span>
    </div>
  {% endif %}
</section>
